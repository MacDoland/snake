import directions from "../helpers/direction";
import EventDispatcher from "../helpers/event-dispatcher";
import Snake from "../snake";
import Grid from "../structures/grid";
import Timer from "../helpers/timer";
import Vector from "../structures/vector";
import InputManager from "./input-manager";
import AudioManager from "./audio-manager";

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
    #audioManager;

    constructor() {
        this.#initialSnakeLength = 6;
        this.#grid = new Grid(20, 20);
        this.#snake = new Snake(this.#grid.getCenter(), this.#initialSnakeLength, directions.UP);
        this.#timer = new Timer();
        this.#eventDispatcher = new EventDispatcher();
        this.#gameInProgess = false;
        this.#moveDelay = 150;
        this.#currentSnakePositions = [];
        this.#audioManager = new AudioManager();
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

        this.#audioManager.load('eat', '../audio/eat.wav', 0.8);
        this.#audioManager.load('up', '../audio/wo.wav');
        this.#audioManager.load('right', '../audio/we.wav');
        this.#audioManager.load('down', '../audio/wa.wav');
        this.#audioManager.load('left', '../audio/wu.wav');
        this.#audioManager.load('bg', '../audio/Monkeys-Spinning-Monkeys.mp3', 0.3, true);
        this.#audioManager.load('cheering', '../audio/cheering.wav', 0.3, false);
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
        this.#audioManager.play('bg');

        const onEatHandler = (snakeLength) => {
            this.#score = snakeLength - this.#initialSnakeLength;
            this.#audioManager.play('eat');
        };

        const onChangeDirectionHandler = (direction) => {
            this.#audioManager.play(direction.toString().toLowerCase());
        }

        this.#snake.removeOnEat(onEatHandler);
        this.#snake.onEat(onEatHandler);
        this.#snake.removeOnChangeDirection(onChangeDirectionHandler);
        this.#snake.onChangeDirection(onChangeDirectionHandler);

        this.#eventDispatcher.dispatch(this.#events.UPDATE, {
            currentSnakeDirection: this.#snake.getDirection(),
            currentSnakePositions: this.#snake.getPositions(),
            snakeLength: this.#snake.getLength(),
            bulges: this.#snake.getBulges(),
            applePosition: this.#applePosition,
            score: this.#score,
        });
    }

    start() {
        this.#gameInProgess = true;
        this.#timer.start(this.#moveDelay);
    }

    end(positions, direction) {
        this.#timer.stop();
        this.#timer.removeOnElapsed(this.#update);
        this.#snake.resetHandlers();
        this.#audioManager.stop('bg');
        this.#audioManager.play('cheering');
        this.#eventDispatcher.dispatch(this.#events.END,
            {
                currentSnakeDirection: direction,
                currentSnakePositions: positions,
                snakeLength: this.#snake.getLength(),
                bulges: this.#snake.getBulges(),
                applePosition: this.#applePosition,
                score: this.#score,
                grid: this.#grid
            });
    }

    /* Private Methods */
    #update() {
        if (this.#gameInProgess) {
            const previousPositions = this.#currentSnakePositions;
            const previousDirection = this.#snake.getDirection();;
            this.#snake.move();
            let headPosition = this.#snake.getHeadPosition();

            //running into itself or the outer walls will end the game
            if (this.#snake.hasOverlapped() || !this.#isWithinGrid(this.#snake, this.#grid)) {
                this.#gameInProgess = false;
                this.end(previousPositions, previousDirection);
            }
            else {
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

                this.#eventDispatcher.dispatch(this.#events.UPDATE, {
                    currentSnakeDirection: this.#snake.getDirection(),
                    currentSnakePositions: this.#snake.getPositions(),
                    snakeLength: this.#snake.getLength(),
                    bulges: this.#snake.getBulges(),
                    applePosition: this.#applePosition,
                    score: this.#score,
                });
            }
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

    removeOnInit(handler) {
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