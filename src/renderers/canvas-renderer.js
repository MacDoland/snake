import directions, { solveDirection, solveBodyDirection, directionAsVector } from "../helpers/direction";
import SpriteSheet from "../helpers/spritesheet";
import Vector from "../structures/vector";

class CanvasRenderer {
    #canvas;
    #context;
    #cellSize;
    #borderWidth;
    #spriteSheet;

    constructor(canvas, cellSize = 30) {
        this.#canvas = canvas;
        this.#context = canvas.getContext('2d');
        this.#cellSize = cellSize;
        this.#borderWidth = 2;
        this.#spriteSheet = new SpriteSheet('./images/snake-spritesheet.png');
        this.#loadSprites();
    }

    clear() {
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    drawGrid(grid) {
        this.#context.beginPath();

        let gridCoordinates = grid.getGridCoordinates();

        gridCoordinates.forEach((coordinate) => {
            this.#context.beginPath();
            this.#context.fillStyle = (coordinate.y % 2) === (coordinate.x % 2) ? "#ffffff" : "#ced7dd ";
            this.#context.rect(coordinate.x * this.#cellSize,
                coordinate.y * this.#cellSize,
                this.#cellSize,
                this.#cellSize);
            this.#context.fill();
            this.#context.closePath();
        });

        this.#context.closePath();
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

    takeScreenshot() {
        return this.#canvas.toDataURL('png');
    }



    drawApple(coordinate) {
        let { spriteSheet, x, y, width, height } = this.#spriteSheet.getSprite('apple');
        this.#context.rect(coordinate.x * this.#cellSize + this.#borderWidth,
            coordinate.y * this.#cellSize + this.#borderWidth,
            this.#cellSize - this.#borderWidth,
            this.#cellSize - this.#borderWidth);
        this.#context.drawImage(spriteSheet, x, y, width, height, coordinate.x * this.#cellSize, coordinate.y * this.#cellSize, this.#cellSize, this.#cellSize);
    }

    drawSnakeMouth(headPosition, direction) {
        let directionVector = directionAsVector(direction);
        const halfSize = this.#cellSize / 2;
        const offset = Vector.multiplyScalar(directionVector, halfSize / 1.5);

        this.#context.beginPath();
        this.#context.arc(headPosition.x * this.#cellSize + halfSize + offset.x, headPosition.y * this.#cellSize + halfSize + offset.y, this.#cellSize / 3.5, 0, 2 * Math.PI, false);
        this.#context.fillStyle = 'black';
        this.#context.fill();
        this.#context.closePath();
    }

    drawBulges(bulges) {
        if (Array.isArray(bulges)) {
            const halfSize = this.#cellSize / 2;
            bulges.forEach(({ position, size }) => {
                this.#context.beginPath();
                this.#context.arc(position.x * this.#cellSize+ halfSize, position.y * this.#cellSize+ halfSize, this.#cellSize/1.5 * size, 0, 2 * Math.PI, false);
                this.#context.fillStyle = '#5b7bf9';
                this.#context.fill();
                this.#context.closePath();
            });
        }
    }

    #drawSnakePart(coordinate, { spriteSheet, x, y, width, height }) {
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