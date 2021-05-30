import EventDispatcher from './helpers/event-dispatcher';

class Timer {
    #elaspsed;
    #startTime;
    #current;
    #target;
    #isActive;
    #eventDispatcher;
    #events;

    start(target) {
        this.#current = 0;
        this.#startTime = new Date();
        this.#target = target;
        this.#isActive = true;
        this.#eventDispatcher = new EventDispatcher();
        this.#events = {
            TICK: "TICK",
            ELAPSED: "ELAPSED"
        }
    }

    reset() {
        this.#current = 0;
        this.#startTime = new Date();
    }

    hasElapsed() {
        return this.#elaspsed;
    }

    tick() {
        if (this.#isActive) {
            this.#eventDispatcher.dispatch(this.#events.TICK);
            this.#current = new Date() - this.#startTime;
            this.#elaspsed = this.#current > this.#target;

            if (this.hasElapsed()) {
                this.#eventDispatcher.dispatch(this.#events.ELAPSED);
                this.reset();
            }
        }

    }

    onTick(handler) {
        this.#eventDispatcher.registerHandler(this.#events.TICK, handler);
    }

    removeOnTick(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.TICK, handler);
    }

    onElapsed(handler) {
        this.#eventDispatcher.registerHandler(this.#events.ELAPSED, handler);
    }

    removeOnElapsed(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.ELAPSED, handler);
    }

}

export default Timer;