import CanvasRenderer from './renderers/canvas-renderer';
import GameManager from './game-management/game-manager';
import UI from './ui/ui';
import AudioManager from './game-management/audio-manager';
import Vector from './structures/vector';

const canvas = document.getElementById('canvas');
const renderer = new CanvasRenderer(canvas);
const introScreen = document.getElementById('intro-screen');
const gameScreen = document.getElementById('game-screen');
const highScoreScreen = document.getElementById('high-score-screen');
const reviewScreen = document.getElementById('review-screen');

const gameManager = new GameManager();
const audioManager = new AudioManager();
audioManager.load('menu-bg', './audio/Komiku_-_12_-_Bicycle.mp3', 0.5, true);

const ui = new UI(introScreen, gameScreen, highScoreScreen, reviewScreen);

ui.onMainMenu(() => {
    audioManager.play('menu-bg');
});

ui.onInitGame(() => {
    audioManager.stop('menu-bg');
    gameManager.init();
});

ui.onStartGame(() => {
    gameManager.start();
});

const updateGame = ({ currentSnakePositions, currentSnakeDirection, snakeLength, bulges, applePosition, score }) => {
    const distanceFromApple = Vector.distance(currentSnakePositions[0], applePosition);
    renderer.clear();
    renderer.drawBulges(bulges);
    renderer.drawSnake(currentSnakePositions, currentSnakeDirection, snakeLength);

    if(distanceFromApple < 2){
        renderer.drawSnakeMouth(currentSnakePositions[0], currentSnakeDirection);
    }

    renderer.drawApple(applePosition);
    ui.updateScore(score);
}

gameManager.onInit(updateGame);
gameManager.onUpdate(updateGame);

gameManager.onEnd(({ currentSnakePositions, currentSnakeDirection, snakeLength, applePosition, score, grid }) => {
    renderer.clear();
    renderer.drawGrid(grid);
    renderer.drawSnake(currentSnakePositions, currentSnakeDirection, snakeLength);
    renderer.drawApple(applePosition);
    const screenshot = renderer.takeScreenshot();
    ui.goToReview(screenshot, score);
});





