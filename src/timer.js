class Timer {
    #elaspsed;
    #startTime;
    #current;
    #target;
    #isActive;

    start(target) {
        this.#current = 0;
        this.#startTime = new Date();
        this.#target = target;
        this.#isActive = true;
    }

    reset() {
        this.#current = 0;
        this.#startTime = new Date();
    }

    hasElapsed() {
        return this.#elaspsed;
    }

    tick(){
        if(this.#isActive){
            this.#current = new Date() - this.#startTime;
            this.#elaspsed = this.#current > this.#target;
        }
    }

}

export default Timer;