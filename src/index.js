import CanvasRenderer from './renderers/canvas-renderer';
import GameManager from './game-management/game-manager';
import UI from './ui/ui';
import HighScoreManager from './game-management/highscore-manager';

const canvas = document.getElementById('canvas');
const renderer = new CanvasRenderer(canvas);
const introScreen = document.getElementById('intro-screen');
const gameScreen = document.getElementById('game-screen');
const highScoreScreen = document.getElementById('high-score-screen');
const reviewScreen = document.getElementById('review-screen');

const gameManager = new GameManager();
const highScoreManager = new HighScoreManager('jm-snake');

const ui = new UI(introScreen, gameScreen, highScoreScreen, reviewScreen);

ui.onInitGame(() => {
    gameManager.init();
});

ui.onStartGame(() => {
    gameManager.start();
});

ui.onSubmitHighScores(({ name, score}) => {
    console.log("onSubmitHighScores");
    highScoreManager.addHighScore(name, score);
});

ui.onShowHighScores(() => {
    ui.renderHighScores(highScoreManager.getTopTen());
});

const updateGame = ({ currentSnakePositions, currentSnakeDirection, snakeLength, applePosition, score}) => {
    renderer.clear();
    renderer.drawSnake(currentSnakePositions, currentSnakeDirection, snakeLength);
    renderer.drawApple(applePosition);
    ui.updateScore(score);
}

gameManager.onInit(updateGame);
gameManager.onUpdate(updateGame);

gameManager.onEnd((data) => {
   const screenshot = renderer.takeScreenshot();
   ui.goToReview(screenshot, data.score);
});





