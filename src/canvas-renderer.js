class CanvasRenderer {
    #canvas;
    #context;
    #width;
    #height;
    #cellSize;
    #borderWidth;

    constructor(canvas, cellSize = 20) {
        this.#canvas = canvas;
        this.#context = canvas.getContext('2d');
        this.#height = canvas.height;
        this.#width = canvas.width;
        this.#cellSize = cellSize;
        this.#borderWidth = 2;
    }

    clear(){
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    drawGrid(grid) {
        this.#canvas.height = this.#cellSize * grid.getColumnCount() + this.#borderWidth;
        this.#canvas.width = this.#cellSize * grid.getRowCount() + this.#borderWidth;
        this.#context.beginPath();

        let gridCoordinates = grid.getGridCoordinates();

        gridCoordinates.forEach((coordinate) => {
            this.#context.rect(coordinate.x * this.#cellSize + this.#borderWidth,
                coordinate.y * this.#cellSize + this.#borderWidth,
                this.#cellSize - this.#borderWidth,
                this.#cellSize - this.#borderWidth);
        })
       
        this.#context.fillStyle = "white";
        this.#context.fill();
        this.#context.closePath();
    }

    drawSnake(snake) {
        let positions = snake.getPositions();

        this.#context.beginPath();
        positions.forEach((coordinate) => {
            this.#context.rect(coordinate.x * this.#cellSize + this.#borderWidth / 2,
                coordinate.y * this.#cellSize + this.#borderWidth / 2,
                this.#cellSize,
                this.#cellSize);
        })

        this.#context.fillStyle = "green";
        this.#context.strokeStyle = "black";
        this.#context.fill();
        this.#context.stroke();
        this.#context.closePath();
    }

    drawApple(coordinate){
        this.#context.beginPath();
        this.#context.rect(coordinate.x * this.#cellSize + this.#borderWidth,
            coordinate.y * this.#cellSize + this.#borderWidth,
            this.#cellSize - this.#borderWidth,
            this.#cellSize - this.#borderWidth);
        this.#context.fillStyle = "red";
        this.#context.fill();
        this.#context.closePath();
    }


}

export default CanvasRenderer;