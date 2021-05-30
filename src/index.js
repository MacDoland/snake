import Snake from './snake';
import Grid from './structures/grid';
import CanvasRenderer from './renderers/canvas-renderer';
import directions from './direction';
import Timer from './timer';
import Vector from './structures/vector';

const canvas = document.getElementById('canvas');
const renderer = new CanvasRenderer(canvas);
let score = 0;
const initialSnakeSize = 3;
const scoreElement = document.getElementById('score');
const grid = new Grid(20, 20);
let snake = new Snake(grid.getCenter());
const gameInProgress = true;
renderer.drawGrid(grid);
renderer.drawSnake(snake);

let applePosition = grid.getRandomCoordinate(snake.getPositions());
renderer.drawApple(applePosition);

const timer = new Timer();
timer.start(200);

const timerLoop = () => {
    timer.tick();

    if (gameInProgress) {
        window.requestAnimationFrame(timerLoop);
    }
}

timer.onElapsed(() => {
    snake.move();

    let headPosition = snake.getHeadPosition();

    if (Vector.isEqual(headPosition, applePosition)) {
        snake.eat();
        applePosition = grid.getRandomCoordinate(snake.getPositions());
    }

    if (snake.hasOverlapped()) {
        //we've eating ourselves - game over!
        alert('Game Over!');
        //gameInProgress = false;
        snake = new Snake(grid.getCenter());
        applePosition = grid.getRandomCoordinate(snake.getPositions());
        score = 0;
    }

    keepWithinGrid(snake, grid);
});

timer.onElapsed(() => {
    renderer.clear();
    renderer.drawGrid(grid);
    renderer.drawSnake(snake);
    renderer.drawApple(applePosition);
});

snake.onEat((snakeLength) => {
    score = snakeLength -initialSnakeSize;
    scoreElement.innerHTML = score;
    console.log('score: ', score);
})

window.requestAnimationFrame(timerLoop);

document.body.onkeyup = function (e) {
    if (e.keyCode == 37) {
        snake.changeDirection(directions.LEFT);
    }

    if (e.keyCode == 38) {
        snake.changeDirection(directions.UP);
    }

    if (e.keyCode == 39) {
        snake.changeDirection(directions.RIGHT);
    }

    if (e.keyCode == 40) {
        snake.changeDirection(directions.DOWN);
    }

    if (e.keyCode == 69) {
        snake.eat();
        renderer.drawSnake(snake);
    }

    if (e.keyCode == 32) {
        snake.move();
        renderer.drawSnake(snake);
    }
}

const keepWithinGrid = (snake, grid) => {
    let headPosition = snake.getHeadPosition();

    if (headPosition.y < 0) {
        snake.setHeadPosition(new Vector(headPosition.x, grid.getRowCount() - 1));
    }

    if (headPosition.y >= grid.getRowCount()) {
        snake.setHeadPosition(new Vector(headPosition.x, 0));
    }

    if (headPosition.x < 0) {
        snake.setHeadPosition(new Vector(grid.getColumnCount() - 1, headPosition.y));
    }

    if (headPosition.x >= grid.getColumnCount()) {
        snake.setHeadPosition(new Vector(0, headPosition.y));
    }
}


