import EventDispatcher from './helpers/event-dispatcher';
import directions, { directionAsVector, getDirectionOpposite, isDirection } from "./direction";
import SinglyLinkedList from "./structures/linked-list";
import Vector from './structures/vector.js';

class Snake {
    #body;
    #direction;
    #eventDispatcher;
    #events;

    constructor(initialPosition, initialDirection = directions.UP) {
        this.#direction = initialDirection;
        const oppositeDirection = getDirectionOpposite(initialDirection);
        this.#body = new SinglyLinkedList();
        const directionVector = directionAsVector(oppositeDirection);
        this.#body.push(new SnakeSegment(initialPosition));
        this.#body.push(new SnakeSegment(Vector.add(initialPosition, directionVector)));
        this.#body.push(new SnakeSegment(Vector.add(initialPosition, directionVector.multiplyScalar(2))));
        this.#eventDispatcher = new EventDispatcher();
        this.#events = {
            EAT: "EAT"
        }
    }

    changeDirection(newDirection) {
        const oppositeDirection = getDirectionOpposite(this.#direction);

        if (isDirection(newDirection) && newDirection !== oppositeDirection) {
            this.#direction = newDirection;
        }
    }

    move() {
        let node = this.#body.head;
        const directionVector = directionAsVector(this.#direction);
        let currentPosition = node.value().position;
        let newPosition = Vector.add(currentPosition, directionVector);
        let i = 1;

        while (i <= this.#body.length) {
            currentPosition = node.value().position;

            node.setValue({
                position: newPosition
            });

            newPosition = currentPosition;
            node = node.next();

            i++;
        }
    }

    eat() {
        const last = this.#body.tail.value();
        this.#body.push(last);
        this.#eventDispatcher.dispatch(this.#events.EAT, this.#body.length);
    }

    getBody() {
        return this.#body;
    }

    getDirection() {
        return this.#direction;
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