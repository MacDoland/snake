import EventDispatcher from '../helpers/event-dispatcher';

class UI {
    #eventDispatcher;
    #events;

    #startScreen;
    #gameScreen;
    #highScoreScreen;

    #scoreElement

    constructor(startScreen, gameScreen, highScoreScreen) {
        this.#eventDispatcher = new EventDispatcher();
        this.#events = {
            STARTGAME: "STARTGAME"
        };
        Object.freeze(this.#events);

        this.#startScreen = startScreen;
        this.#gameScreen = gameScreen;
        this.#highScoreScreen = highScoreScreen;

        this.#scoreElement = this.#gameScreen.querySelector('#score')

        this.#showStartScreen();
    }

    updateScore(score){
        this.#scoreElement.innerHTML = score;
    }

    onStartGame(handler) {
        this.#eventDispatcher.registerHandler(this.#events.STARTGAME, handler);
    }

    removeOnStartGame(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.STARTGAME, handler);
    }

    #showStartScreen() {
        this.#startScreen.classList.remove('hidden');
        this.#gameScreen.classList.add('hidden');
        this.#highScoreScreen.classList.add('hidden');

        const startButton = this.#startScreen.querySelector('#start-button');

        const onClick = () => {
            startButton.removeEventListener('click', onClick);
            this.#showGameScreen();
            this.#eventDispatcher.dispatch(this.#events.STARTGAME)
        }

        startButton.addEventListener('click', onClick)
    }

    #showGameScreen() {
        this.#startScreen.classList.add('hidden');
        this.#gameScreen.classList.remove('hidden');
        this.#highScoreScreen.classList.add('hidden');
    }

    #showHighScoreScreen() {
        this.#startScreen.classList.add('hidden');
        this.#gameScreen.classList.add('hidden');
        this.#highScoreScreen.classList.remove('hidden');
    }
}

export default UI