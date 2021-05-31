import CanvasRenderer from './renderers/canvas-renderer';
import GameManager from './game-management/game-manager';
import UI from './ui/ui';

const canvas = document.getElementById('canvas');
const renderer = new CanvasRenderer(canvas);
const introScreen = document.getElementById('intro-screen');
const gameScreen = document.getElementById('game-screen');
const highScoreScreen = document.getElementById('high-score-screen');

const gameManager = new GameManager();

const ui = new UI(introScreen, gameScreen, highScoreScreen);

ui.onStartGame(() => {
    gameManager.begin();
});

gameManager.onUpdate((data) => {
    renderer.clear();
    renderer.drawGrid(data.grid);
    renderer.drawSnake(data.currentSnakePositions, data.direction, data.snakeLength);
    renderer.drawApple(data.applePosition);
    ui.updateScore(data.score);
});

gameManager.onEnd(() => {
   
});



