class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    multiplyScalar(value) {
        this.x *= value;
        this.y *= value;
        return this;
    }

    get() {
        return {
            x: this.x,
            y: this.y
        }
    }

    static add(vectorA, vectorB) {
        return new Vector(vectorA.x + vectorB.x, vectorA.y + vectorB.y);
    }

    static isEqual(vectorA, vectorB) {
        return vectorA.x === vectorB.x && vectorA.y === vectorB.y;
    }
}

export default Vector;