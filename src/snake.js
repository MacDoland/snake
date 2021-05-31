import EventDispatcher from './helpers/event-dispatcher';
import directions, { directionAsVector, getDirectionOpposite, isDirection } from "./direction";
import SinglyLinkedList from "./structures/linked-list";
import Vector from './structures/vector.js';

class Snake {
    #body;
    #direction;
    #nextDirection;
    #eventDispatcher;
    #events;
    #initialPosition;
    #initialDirection;

    constructor(initialPosition, initialDirection = directions.UP) {
        this.#direction = initialDirection;
        this.#nextDirection = initialDirection;
        this.#initialPosition = initialPosition;
        this.#initialDirection = initialDirection;
       
        this.#eventDispatcher = new EventDispatcher();
        this.#events = {
            EAT: "EAT"
        }

        this.init();
    }

    init(){
        const oppositeDirection = getDirectionOpposite(this.#initialDirection);
        const directionVector = directionAsVector(oppositeDirection);

        this.#body = new SinglyLinkedList();
        this.#body.push(new SnakeSegment(this.#initialPosition));
        this.#body.push(new SnakeSegment(Vector.add(this.#initialPosition, directionVector)));
        this.#body.push(new SnakeSegment(Vector.add(this.#initialPosition, directionVector.multiplyScalar(2))));

        this.#direction = this.#initialDirection;
    }

    changeDirection(newDirection) {
        const oppositeDirection = getDirectionOpposite(this.#direction);

        if (isDirection(newDirection) && newDirection !== oppositeDirection) {
            this.#nextDirection = newDirection;
        }
    }

    move() {
        let node = this.#body.head;
        const directionVector = directionAsVector(this.#nextDirection);
        let currentPosition = node.value().position;
        let newPosition = Vector.add(currentPosition, directionVector);
        this.#body.unshift({position: newPosition}); // add new head
        this.#direction = this.#nextDirection;
    }

    eat() {
        this.#eventDispatcher.dispatch(this.#events.EAT, this.#body.length);
    }

    pop() {
        this.#body.pop(); // remove the tail
    }

    getBody() {
        return this.#body;
    }

    getLength() {
        return this.#body.length;
    }

    getDirection() {
        return this.#direction;
    }

    getNextDirection() {
        return this.#nextDirection;
    }

    getPositions() {
        const positions = [];

        let node = this.#body.head;
        let i = 0;

        while (i < this.#body.length) {
            positions.push(node.value().position.get());
            node = node.next();
            i++;
        }

        return positions;
    }

    getBodyPositions() {
        const positions = this.getPositions();
        positions.shift();
        return positions;
    }

    getHeadPosition() {
        return this.#body.head.value().position;
    }

    setHeadPosition(newPosition) {
        this.#body.head.setValue(new SnakeSegment(newPosition));
    }

    hasOverlapped() {
        const positions = this.getPositions();
        positions.shift();
        return positions.filter((position) => Vector.isEqual(position, this.#body.head.value().position)).length > 0;
    }

    onEat(handler) {
        this.#eventDispatcher.registerHandler(this.#events.EAT, handler);
    }

    removeOnEat(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.EAT, handler);
    }
}

class SnakeSegment {
    constructor(position) {
        this.position = position;
    }
}

export default Snake;