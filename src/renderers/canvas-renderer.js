import directions, { solveDirection, solveBodyDirection } from "../direction";
import SpriteSheet from "../helpers/spritesheet";

class CanvasRenderer {
    #canvas;
    #context;
    #width;
    #height;
    #cellSize;
    #borderWidth;
    #spriteSheet;

    constructor(canvas, cellSize = 30) {
        this.#canvas = canvas;
        this.#context = canvas.getContext('2d');
        this.#height = canvas.height;
        this.#width = canvas.width;
        this.#cellSize = cellSize;
        this.#borderWidth = 2;
        this.#spriteSheet = new SpriteSheet('./images/snake-spritesheet.png');
        this.#loadSprites();
    }

    clear() {
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    drawGrid(grid) {
        this.#canvas.height = this.#cellSize * grid.getColumnCount() + this.#borderWidth;
        this.#canvas.width = this.#cellSize * grid.getRowCount() + this.#borderWidth;
        // this.#context.beginPath();

        // let gridCoordinates = grid.getGridCoordinates();

        // gridCoordinates.forEach((coordinate) => {
        //     this.#context.beginPath();
        //     this.#context.fillStyle = (coordinate.y % 2) === (coordinate.x % 2) ? "#ffffff" : "#eeeeee";
        //     this.#context.rect(coordinate.x * this.#cellSize,
        //         coordinate.y * this.#cellSize,
        //         this.#cellSize,
        //         this.#cellSize);
        //     this.#context.fill();
        //     this.#context.closePath();
        // });

        // this.#context.closePath();
    }

    drawSnake(positions, direction) {
        let bodyDirection, bodyDirectionString, bodySprite;

        this.#context.beginPath();
        for (var i = 1; i < positions.length - 1; i++) {
            bodyDirection = solveBodyDirection(positions[i - 1], positions[i], positions[i + 1]);
            bodyDirectionString = `body-${bodyDirection.toString().toLowerCase()}`;
            bodySprite = this.#spriteSheet.getSprite(bodyDirectionString);

            if (bodySprite) {
                this.#drawSnakePart(positions[i], bodySprite);
            }
        }

        const tailDirection = solveDirection(positions[positions.length - 1], positions[positions.length - 2]);
        const tailDirectionString = `tail-${tailDirection.toString().toLowerCase()}`;
        const tailSprite = this.#spriteSheet.getSprite(tailDirectionString);
        this.#drawSnakePart(positions[positions.length - 1], tailSprite);

        const headDirectionString = `head-${direction.toString().toLowerCase()}`;
        const headSprite = this.#spriteSheet.getSprite(headDirectionString);
        this.#drawSnakePart(positions[0], headSprite);
    }

    #drawSnakePart(coordinate, { spriteSheet, x, y, width, height }) {
        this.#context.drawImage(spriteSheet, x, y, width, height, coordinate.x * this.#cellSize, coordinate.y * this.#cellSize, this.#cellSize, this.#cellSize);
    }

    drawApple(coordinate) {
        let { spriteSheet, x, y, width, height } = this.#spriteSheet.getSprite('apple');
        this.#context.rect(coordinate.x * this.#cellSize + this.#borderWidth,
            coordinate.y * this.#cellSize + this.#borderWidth,
            this.#cellSize - this.#borderWidth,
            this.#cellSize - this.#borderWidth);
        this.#context.drawImage(spriteSheet, x, y, width, height, coordinate.x * this.#cellSize, coordinate.y * this.#cellSize, this.#cellSize, this.#cellSize);
    }

    #loadSprites() {
        this.#spriteSheet.addSprite('apple', 0, 0, 40, 40);
        this.#spriteSheet.addSprite('head-up', 120, 40, 40, 40);
        this.#spriteSheet.addSprite('head-right', 120, 0, 40, 40);
        this.#spriteSheet.addSprite('head-down', 40, 80, 40, 40);
        this.#spriteSheet.addSprite('head-left', 80, 80, 40, 40);

        this.#spriteSheet.addSprite('body-up', 0, 80, 40, 40);
        this.#spriteSheet.addSprite('body-right', 0, 40, 40, 40);
        this.#spriteSheet.addSprite('body-leftdown', 40, 0, 40, 40);
        this.#spriteSheet.addSprite('body-leftup', 40, 40, 40, 40);
        this.#spriteSheet.addSprite('body-down', 0, 80, 40, 40);
        this.#spriteSheet.addSprite('body-left', 0, 40, 40, 40);
        this.#spriteSheet.addSprite('body-rightdown', 80, 0, 40, 40);
        this.#spriteSheet.addSprite('body-rightup', 80, 40, 40, 40);

        this.#spriteSheet.addSprite('tail-down', 120, 80, 40, 40);
        this.#spriteSheet.addSprite('tail-left', 0, 120, 40, 40);
        this.#spriteSheet.addSprite('tail-up', 80, 120, 40, 40);
        this.#spriteSheet.addSprite('tail-right', 40, 120, 40, 40);
    }

}

export default CanvasRenderer;