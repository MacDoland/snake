class Grid {
    #grid;
    #numberOfColumns;
    #numberOfRows; 

    constructor(numberOfColumns = 0, numberOfRows = 0) {
        this.#numberOfColumns = numberOfColumns;
        this.#numberOfRows = numberOfRows;
        this.#grid = new Array(this.#numberOfColumns * this.#numberOfRows);
    }

    getGrid() {
        return this.#grid;
    }

    getIndex(x, y) {
        return (y * this.#numberOfColumns) + x;
    }

    getRandomIndex(excludedIndices = []) {
        const indices = [...this.getGrid().keys()].map((element, index) => index).filter(element => !excludedIndices.includes(element));
        const randomNumber = Math.floor(Math.random() * indices.length);
        return indices[randomNumber];
    }
}

export default Grid;