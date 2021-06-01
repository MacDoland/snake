import EventDispatcher from "../helpers/event-dispatcher";

class InputManager {
    #eventDispatcher;
    #events;

    constructor() {
        this.#eventDispatcher = new EventDispatcher();
        this.#events = {
            UP: 'UP',
            RIGHT: 'RIGHT',
            DOWN: 'DOWN',
            LEFT: 'LEFT',
            E: 'E',
            ANY: 'ANY'
        }

        document.body.addEventListener('keydown', (e) => {
            if (e.keyCode == 37) {
                this.#eventDispatcher.dispatch(this.#events.LEFT)
            }

            if (e.keyCode == 38) {
                this.#eventDispatcher.dispatch(this.#events.UP)
            }

            if (e.keyCode == 39) {
                this.#eventDispatcher.dispatch(this.#events.RIGHT)
            }

            if (e.keyCode == 40) {
                this.#eventDispatcher.dispatch(this.#events.DOWN)
            }

            if (e.keyCode == 69) {
                this.#eventDispatcher.dispatch(this.#events.E)
            }

            this.#eventDispatcher.dispatch(this.#events.ANY)
        });
    }

    onUp(handler) {
        this.#eventDispatcher.registerHandler(this.#events.UP, handler);
    }

    removeOnUp(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.UP, handler);
    }

    onRight(handler) {
        this.#eventDispatcher.registerHandler(this.#events.RIGHT, handler);
    }

    removeOnRight(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.RIGHT, handler);
    }

    onDown(handler) {
        this.#eventDispatcher.registerHandler(this.#events.DOWN, handler);
    }

    removeOnDown(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.DOWN, handler);
    }

    onLeft(handler) {
        this.#eventDispatcher.registerHandler(this.#events.LEFT, handler);
    }

    removeOnLeft(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.LEFT, handler);
    }

    onE(handler) {
        this.#eventDispatcher.registerHandler(this.#events.E, handler);
    }

    removeOnE(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.E, handler);
    }

    onAnyKey(handler) {
        this.#eventDispatcher.registerHandler(this.#events.ANY, handler);
    }

    removeOnAnyKey(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.ANY, handler);
    }
}

export default InputManager;