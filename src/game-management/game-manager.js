import directions from "../direction";
import EventDispatcher from "../helpers/event-dispatcher";
import Snake from "../snake";
import Grid from "../structures/grid";
import Timer from "../timer";
import Vector from "../structures/vector";
import InputManager from "../input-manager";

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

    constructor() {
        this.#initialSnakeLength = 3;
        this.#grid = new Grid(20, 20);
        this.#snake = new Snake(this.#grid.getCenter());
        this.#timer = new Timer();
        this.#eventDispatcher = new EventDispatcher();
        this.#gameInProgess = false;
        this.#moveDelay = 120;
        this.#currentSnakePositions = [];
        this.#events = {
            INIT: 'INIT',
            START: 'START',
            END: 'END',
            PAUSE: 'PAUSE',
            RESET: 'RESET',
            UPDATE: 'UPDATE',
            TICK: 'TICK'
        }
        Object.freeze(this.#events);

        const inputManager = new InputManager();
        inputManager.onUp(() => this.#snake.changeDirection(directions.UP));
        inputManager.onRight(() => this.#snake.changeDirection(directions.RIGHT));
        inputManager.onDown(() => this.#snake.changeDirection(directions.DOWN));
        inputManager.onLeft(() => this.#snake.changeDirection(directions.LEFT));
    }

    /* Public methods */
    init() {
        this.#gameInProgess = false;
        this.#timer.stop();
        this.#timer.clearHandlers();;
        this.#timer.onElapsed(this.#update.bind(this));
        this.#score = 0;
        this.#applePosition = this.#grid.getRandomCoordinate(this.#snake.getPositions());
        this.#snake.init();

        const onEatHandler = (snakeLength) => {
            this.#score = snakeLength - this.#initialSnakeLength;
        };

        this.#snake.removeOnEat(onEatHandler);
        this.#snake.onEat(onEatHandler);

        this.#eventDispatcher.dispatch(this.#events.UPDATE, {
            currentSnakeDirection: this.#snake.getDirection(),
            currentSnakePositions: this.#snake.getPositions(),
            snakeLength: this.#snake.getLength(),
            applePosition: this.#applePosition,
            score: this.#score,
        });
    }

    start() {
        this.#gameInProgess = true;
        this.#timer.start(this.#moveDelay);
    }

    end() {
        this.#timer.stop();
        this.#timer.removeOnElapsed(this.#update);
        this.#eventDispatcher.dispatch(this.#events.END,
            {
                score: this.#score
            });
    }

    /* Private Methods */
    #update() {
        if (this.#gameInProgess) {
            const previousPositions = this.#currentSnakePositions;
            this.#snake.move();
            let headPosition = this.#snake.getHeadPosition();

            //check for apple - grow
            if (Vector.isEqual(headPosition, this.#applePosition)) {
                this.#snake.eat();
                this.#applePosition = this.#grid.getRandomCoordinate(this.#snake.getPositions());
                //no pop - therefor growth
            }
            else {
                this.#snake.pop(); // remove the tail to simulate moving
            }

            this.#currentSnakePositions = this.#snake.getPositions();
            this.#score = this.#snake.getLength() - this.#initialSnakeLength;

            //running into itself or the outer walls will end the game
            if (this.#snake.hasOverlapped() || !this.#isWithinGrid(this.#snake, this.#grid)) {
                this.#gameInProgess = false;
                this.end();
            }

            this.#eventDispatcher.dispatch(this.#events.UPDATE, {
                currentSnakeDirection: this.#snake.getDirection(),
                currentSnakePositions: this.#snake.getPositions(),
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

    /* Events */
    onUpdate(handler) {
        this.#eventDispatcher.registerHandler(this.#events.UPDATE, handler);
    }

    removeOnUpdate(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.UPDATE, handler);
    }

    onInit(handler) {
        this.#eventDispatcher.registerHandler(this.#events.INIT, handler);
    }

    removeonInit(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.INIT, handler);
    }

    onEnd(handler) {
        this.#eventDispatcher.registerHandler(this.#events.END, handler);
    }

    removeOnEnd(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.END, handler);
    }
}

export default GameManager;