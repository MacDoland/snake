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

    clone(){
        return new Vector(this.x, this.y);
    }

    static add(vectorA, vectorB) {
        return new Vector(vectorA.x + vectorB.x, vectorA.y + vectorB.y);
    }

    static distance(vectorA, vectorB) {
        const a = vectorA.x - vectorB.x;
        const b = vectorA.y - vectorB.y;

        return Math.sqrt(a * a + b * b);
    }

    static isEqual(vectorA, vectorB) {
        return vectorA.x === vectorB.x && vectorA.y === vectorB.y;
    }

    static multiplyScalar(vector, value) {
        let clone = vector.clone();
        clone.x *= value;
        clone.y *= value;
        return clone;
    }
}

export default Vector;