import directions from "../direction";
import EventDispatcher from "../helpers/event-dispatcher";
import Snake from "../snake";
import Grid from "../structures/grid";
import Timer from "../timer";
import Vector from "../structures/vector";
import { lerp } from "../helpers/helpers";

class GameManager {

    #score;
    #snake;
    #initialSnakeLength;
    #grid;
    #applePosition;
    #eventDispatcher;
    #events;
    #timer;
    #gameInProgess;
    #moveDelay;
    #currentSnakePositions;
    #previousSnakePositions;
    #interpolatedSnakePositions;

    constructor() {
        this.#initialSnakeLength = 3;
        this.#grid = new Grid(20, 20);
        this.#snake = new Snake(this.#grid.getCenter());
        this.#applePosition = this.#grid.getRandomCoordinate(this.#snake.getPositions());
        this.#score = 0;
        this.#timer = new Timer();
        this.#eventDispatcher = new EventDispatcher();
        this.#gameInProgess = false;
        this.#moveDelay = 125;
        this.#currentSnakePositions = [];
        this.#previousSnakePositions = [];
        this.#interpolatedSnakePositions = [];
        this.#events = {
            START: 'START',
            END: 'END',
            PAUSE: 'PAUSE',
            RESET: 'RESET',
            UPDATE: 'UPDATE',
            TICK: 'TICK'
        }
        Object.freeze(this.#events);

        //TODO: REFACTOR into input manager
        document.body.onkeyup = (function (e) {
            if (e.keyCode == 37) {
                this.#snake.changeDirection(directions.LEFT);
            }

            if (e.keyCode == 38) {
                this.#snake.changeDirection(directions.UP);
            }

            if (e.keyCode == 39) {
                this.#snake.changeDirection(directions.RIGHT);
            }

            if (e.keyCode == 40) {
                this.#snake.changeDirection(directions.DOWN);
            }

            if (e.keyCode == 69) {
                this.#snake.eat();
            }

            if (e.keyCode == 32) {
                this.#snake.move();
            }
        }).bind(this);
    }

    begin() {
        this.#gameInProgess = true;
        this.#timer.onElapsed(this.#update.bind(this));
        this.#timer.onTick((progress) => {
            if (this.#gameInProgess) {
                this.#interpolatedSnakePositions = this.#previousSnakePositions.map((position, index) => {
                    return new Vector(
                        lerp(position.x, this.#currentSnakePositions[index].x, progress),
                        lerp(position.y, this.#currentSnakePositions[index].y, progress),
                    );
                });

                this.#eventDispatcher.dispatch(this.#events.TICK, {
                    grid: this.#grid,
                    currentSnakePositions: this.#currentSnakePositions,
                    previousSnakePositions: this.#previousSnakePositions,
                    interpolatedSnakePositions: this.#interpolatedSnakePositions,
                    direction: this.#snake.getDirection(),
                    applePosition: this.#applePosition,
                    score: this.#score
                });
            }
        });
        this.#timer.start(this.#moveDelay);

        this.#snake.onEat((snakeLength) => {
            this.#score = snakeLength - this.#initialSnakeLength;
        })
    }

    end() {
        this.#timer.stop();
        this.#timer.removeOnElapsed(this.#update);
        this.#eventDispatcher.dispatch(this.#events.END);
    }

    #update() {
        if (this.#gameInProgess) {
            this.#previousSnakePositions = this.#currentSnakePositions;
            this.#snake.move();
            this.#currentSnakePositions = this.#snake.getPositions();

            let headPosition = this.#snake.getHeadPosition();

            //check for apple
            if (Vector.isEqual(headPosition, this.#applePosition)) {
                this.#snake.eat();
                this.#applePosition = this.#grid.getRandomCoordinate(this.#snake.getPositions());
            }

            if (this.#snake.hasOverlapped() || !this.#isWithinGrid(this.#snake, this.#grid)) {
                //we've eating ourselves - game over!
                // alert('Game Over!');
                this.#gameInProgess = false;
                // this.#snake = new Snake(this.#grid.getCenter());
                // this.#applePosition = this.#grid.getRandomCoordinate(this.#snake.getPositions());
                // this.#score = 0;

            }

            this.#score = this.#snake.getLength() - this.#initialSnakeLength;

            // this.#keepWithinGrid(this.#snake, this.#grid);
            this.#eventDispatcher.dispatch(this.#events.UPDATE, {
                grid: this.#grid,
                currentSnakePositions: this.#currentSnakePositions,
                previousSnakePositions: this.#previousSnakePositions,
                interpolatedSnakePositions: this.#interpolatedSnakePositions,
                direction: this.#snake.getDirection(),
                snakeLength: this.#snake.getLength(),
                applePosition: this.#applePosition,
                score: this.#score,
            });
        }
    }

    #isWithinGrid(snake, grid) {
        let headPosition = snake.getHeadPosition();

        return headPosition.y >= 0
            && headPosition.y < grid.getRowCount()
            && headPosition.x >= 0
            && headPosition.x < grid.getColumnCount();
    }

    #keepWithinGrid(snake, grid) {
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

    onUpdate(handler) {
        this.#eventDispatcher.registerHandler(this.#events.UPDATE, handler);
    }

    removeOnUpdate(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.UPDATE, handler);
    }

    onTick(handler) {
        this.#eventDispatcher.registerHandler(this.#events.TICK, handler);
    }

    removeOnTick(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.TICK, handler);
    }

    onEnd(handler) {
        this.#eventDispatcher.registerHandler(this.#events.END, handler);
    }

    removeOnEnd(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.END, handler);
    }
}

export default GameManager;