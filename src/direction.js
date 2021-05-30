import Vector from "./structures/vector";

const directions = {
    UP: "UP",
    RIGHT: "RIGHT",
    DOWN: "DOWN",
    LEFT: "LEFT"
}

Object.freeze(directions);

const getDirectionOpposite = (direction) => {
    switch (direction) {
        case directions.UP:
            return directions.DOWN;
        case directions.RIGHT:
            return directions.LEFT;
        case directions.DOWN:
            return directions.UP;
        case directions.LEFT:
            return directions.RIGHT;
    }
}

const directionAsVector = (direction) => {
    switch (direction) {
        case directions.UP:
            return new Vector(0, -1);
        case directions.RIGHT:
            return new Vector(1, 0);
        case directions.DOWN:
            return new Vector(0, 1);
        case directions.LEFT:
            return new Vector(-1, 0);
    }
}

const isDirection = (direction => {
    return Object.keys(directions).includes(direction);
})

export { directionAsVector, getDirectionOpposite, isDirection };
export default directions;