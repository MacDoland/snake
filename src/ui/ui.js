import EventDispatcher from '../helpers/event-dispatcher';
import InputManager from '../input-manager';

class UI {
    #inputManager;
    #eventDispatcher;
    #events;
    #startScreen;
    #gameScreen;
    #highScoreScreen;
    #reviewScreen;
    #promptElement;
    #promptElementText;
    #scoreElement

    constructor(startScreen, gameScreen, highScoreScreen, reviewScreen) {
        this.#inputManager = new InputManager();
        this.#eventDispatcher = new EventDispatcher();
        this.#events = {
            INIT: "INIT",
            STARTGAME: "STARTGAME",
            SUBMITSCORE: "SUBMITSCORE",
            SHOWHIGHSCORES: "SHOWHIGHSCORES"
        };
        Object.freeze(this.#events);

        this.#startScreen = startScreen;
        this.#gameScreen = gameScreen;
        this.#highScoreScreen = highScoreScreen;
        this.#reviewScreen = reviewScreen;

        this.#scoreElement = document.body.querySelectorAll('.score')
        this.#promptElement = document.getElementById('prompt');
        this.#promptElementText = document.getElementById('prompt-text');
        this.#clearPrompt();

        this.#showStartScreen();
    }

    updateScore(score) {
        for (var i = 0; i < this.#scoreElement.length; i++) {
            this.#scoreElement[i].innerHTML = score;
        }
    }

    goToReview(image, score) {
        this.#showReviewScreen(score);
        this.#reviewScreen.querySelector('img').src = image;
        this.updateScore(score);
    }

    renderHighScores(highScores) {
        const highscoresElement = this.#highScoreScreen.querySelector('#high-scores');

        const highScoresHtml = highScores.map(({ name, value }) => {
            return `<li><div>${name}</div></li><li><div>${value}</div></li>`
        });



        highscoresElement.innerHTML = highScoresHtml.join("");
    }

    onInitGame(handler) {
        this.#eventDispatcher.registerHandler(this.#events.INIT, handler);
    }

    removeonInitGame(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.INIT, handler);
    }

    onStartGame(handler) {
        this.#eventDispatcher.registerHandler(this.#events.STARTGAME, handler);
    }

    removeOnStartGame(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.STARTGAME, handler);
    }

    onSubmitHighScores(handler) {
        this.#eventDispatcher.registerHandler(this.#events.SUBMITSCORE, handler);
    }

    removeOnSubmitHighScores(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.SUBMITSCORE, handler);
    }

    onShowHighScores(handler) {
        this.#eventDispatcher.registerHandler(this.#events.SHOWHIGHSCORES, handler);
    }

    removeOnShowHighScores(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.SHOWHIGHSCORES, handler);
    }


    #showStartScreen() {
        this.#show(this.#startScreen);
        this.#hide(this.#gameScreen);
        this.#hide(this.#highScoreScreen);
        this.#hide(this.#reviewScreen);

        const highScoresButton = this.#startScreen.querySelector('#high-scores-button');
        const startButton = this.#startScreen.querySelector('#start-button');

        const onStartGameAction = () => {
            startButton.removeEventListener('click', onStartGameAction);
            this.#startGame();
        }

        const onHighScoresAction = () => {
            highScoresButton.removeEventListener('click', onHighScoresAction);
            this.#showHighScoreScreen();
            this.#eventDispatcher.dispatch(this.#events.SHOWHIGHSCORES);
        }

        startButton.addEventListener('click', onStartGameAction);
        highScoresButton.addEventListener('click', onHighScoresAction);
    }

    #startGame() {
        this.#showGameScreen();
        this.#eventDispatcher.dispatch(this.#events.INIT);
        this.#prompt('Press any key to begin');

        const onBeingGameAction = () => {
            this.#inputManager.removeOnAnyKey(onBeingGameAction);
            this.#clearPrompt();
            this.#eventDispatcher.dispatch(this.#events.STARTGAME);
        }

        this.#inputManager.onAnyKey(onBeingGameAction);
    }

    #showGameScreen() {
        this.#hide(this.#startScreen);
        this.#show(this.#gameScreen);
        this.#hide(this.#highScoreScreen);
        this.#hide(this.#reviewScreen);
    }

    #showHighScoreScreen() {
        this.#hide(this.#startScreen);
        this.#hide(this.#gameScreen);
        this.#show(this.#highScoreScreen);
        this.#hide(this.#reviewScreen);

        const backToMenuButton = this.#highScoreScreen.querySelector('#back-button');
        const backToMenuAction = () => {
            backToMenuButton.removeEventListener('click', backToMenuAction);
            this.#showStartScreen();
        }
        backToMenuButton.addEventListener('click', backToMenuAction);
    }

    #showReviewScreen(score) {
        this.#hide(this.#startScreen);
        this.#hide(this.#gameScreen);
        this.#hide(this.#highScoreScreen);
        this.#show(this.#reviewScreen);

        const playAgainButton = this.#reviewScreen.querySelector('#play-again-button');
        const backToMenuButton = this.#reviewScreen.querySelector('#menu-button');
        const scoreButton = this.#reviewScreen.querySelector('#submit-button');
        const nameInput = this.#reviewScreen.querySelector('#name');

        const submitScoreAction = (e) => {
            e.preventDefault();

            if (typeof (nameInput.value) === 'string' && nameInput.value.length > 0) {
                console.log("adding high score");
                scoreButton.removeEventListener('click', submitScoreAction);
                this.#eventDispatcher.dispatch(this.#events.SUBMITSCORE, {
                    name: nameInput.value,
                    score
                });

                this.#showHighScoreScreen();
                this.#eventDispatcher.dispatch(this.#events.SHOWHIGHSCORES);
            }
            else {
                alert('Please enter a name');
            }
        }

        const playAgainAction = () => {
            playAgainButton.removeEventListener('click', playAgainAction);
            this.#startGame();
        }

        const backToMenuAction = () => {
            backToMenuButton.removeEventListener('click', backToMenuAction);
            this.#showStartScreen();
        }

        playAgainButton.addEventListener('click', playAgainAction);
        backToMenuButton.addEventListener('click', backToMenuAction);
        scoreButton.addEventListener('click', submitScoreAction);
    }

    #show(element) {
        element.classList.remove('hidden');
    }

    #hide(element) {
        element.classList.add('hidden');
    }

    #prompt(text) {
        this.#show(this.#promptElement);
        this.#promptElementText.innerHTML = text;
    }

    #clearPrompt() {
        this.#promptElementText.innerHTML = '';
        this.#hide(this.#promptElement);
    }
}

export default UI;