import Vector from "./vector";

class Grid {
    #grid;
    #numberOfColumns;
    #numberOfRows; 

    constructor(numberOfColumns = 0, numberOfRows = 0) {
        this.#numberOfColumns = numberOfColumns;
        this.#numberOfRows = numberOfRows;
        this.#grid = new Array(this.#numberOfColumns * this.#numberOfRows);
    }

    getCenter(){
        return new Vector((this.#numberOfColumns / 2) - 1, (this.#numberOfRows / 2 ) - 1);
    }

    getColumnCount(){
        return this.#numberOfColumns;
    }

    getRowCount(){
        return this.#numberOfRows;
    }

    getGrid() {
        return this.#grid;
    }

    getGridCoordinate(index) {
        return new Vector(index % this.#numberOfColumns, Math.floor(index / this.#numberOfRows));
    }

    getIndex(x, y) {
        return (y * this.#numberOfColumns) + x;
    }
    
    getGridCoordinates() {
        console.log("getGridCoordinates");
        return [...this.getGrid().keys()].map((element, index) => this.getGridCoordinate(index));
    }

    getRandomIndex(excludedIndices = []) {
        const indices = [...this.getGrid().keys()].map((element, index) => index).filter(element => !excludedIndices.includes(element));
        const randomNumber = Math.floor(Math.random() * indices.length);
        return indices[randomNumber];
    }

    getRandomCoordinate(excludedCoordinates = []) {
        const excludedIndices = excludedCoordinates.map(coordinate => this.getIndex(coordinate.x, coordinate.y));
        const randomIndex = this.getRandomIndex(excludedIndices);
        return this.getGridCoordinate(randomIndex);
    }
}

export default Grid;