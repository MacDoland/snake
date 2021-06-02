import EventDispatcher from './helpers/event-dispatcher';
import directions, { directionAsVector, getDirectionOpposite, isDirection } from "./helpers/direction";
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
    #initialLength;
    #bulges;

    constructor(initialPosition, initialLength = 5, initialDirection = directions.UP) {
        this.#direction = initialDirection;
        this.#nextDirection = initialDirection;
        this.#initialPosition = initialPosition;
        this.#initialDirection = initialDirection;
        this.#initialLength = initialLength;

        this.#eventDispatcher = new EventDispatcher();
        this.#events = {
            EAT: "EAT",
            CHANGEDIRECTION: "CHANGEDIRECTION"
        }

        this.init();
    }

    init() {
        const oppositeDirection = getDirectionOpposite(this.#initialDirection);
        const directionVector = directionAsVector(oppositeDirection);

        this.#body = new SinglyLinkedList();
        this.#body.push(this.#initialPosition);
        let offset;

        for (let i = 1; i < this.#initialLength; i++) {
            offset = Vector.multiplyScalar(directionVector, i);
            this.#body.push(Vector.add(this.#initialPosition, offset));
        }

        this.#direction = this.#initialDirection;
        this.#bulges = [];
    }

    changeDirection(newDirection) {
        const oppositeDirection = getDirectionOpposite(this.#direction);

        if (isDirection(newDirection) && newDirection !== oppositeDirection) {
            this.#nextDirection = newDirection;
        }

        if (this.#direction != newDirection) {
            this.#eventDispatcher.dispatch(this.#events.CHANGEDIRECTION, newDirection);
        }
    }

    move() {
        let node = this.#body.head;
        const directionVector = directionAsVector(this.#nextDirection);
        let currentPosition = node.value();
        let newPosition = Vector.add(currentPosition, directionVector);
        this.#body.unshift(newPosition); // add new head
        this.#direction = this.#nextDirection;

        //progress any bulges
        this.#bulges.filter((bulge) => !bulge.isAvailable).forEach((bulge) => { 
            bulge.step(this.#body.head, this.#body.length);
            bulge.step(this.#body.head, this.#body.length);
        });

    }

    eat() {
        this.#eventDispatcher.dispatch(this.#events.EAT, this.#body.length);

        //if no available bulges then create one
        const availableBulges = this.#bulges.filter((bulge) => bulge.isAvailable);

        if (availableBulges.length > 0) {
            availableBulges[0].start(this.#body.head);
        }
        else {
            const bulge = new SnakeBulge();
            bulge.start(this.#body.head);
            this.#bulges.push(bulge);
        }
    }

    pop() {
        this.#body.pop(); // remove the tail
    }

    resetHandlers() {
        this.#eventDispatcher.reset();
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
            positions.push(node.value().get());
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

    getBulges() {
        return this.#bulges
            .filter((bulge) => !bulge.isAvailable)
            .map((bulge) => {
                return {
                    position: bulge.getPosition(),
                    size: bulge.size
                }
            })
    }

    getHeadPosition() {
        return this.#body.head.value();
    }

    setHeadPosition(newPosition) {
        this.#body.head.setValue(new SnakeSegment(newPosition));
    }

    hasOverlapped() {
        const positions = this.getPositions();
        positions.shift();
        return positions.filter((position) => Vector.isEqual(position, this.#body.head.value())).length > 0;
    }

    /* Events */
    onEat(handler) {
        this.#eventDispatcher.registerHandler(this.#events.EAT, handler);
    }

    removeOnEat(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.EAT, handler);
    }

    onChangeDirection(handler) {
        this.#eventDispatcher.registerHandler(this.#events.CHANGEDIRECTION, handler);
    }

    removeOnChangeDirection(handler) {
        this.#eventDispatcher.deregisterHandler(this.#events.CHANGEDIRECTION, handler);
    }
}

class SnakeBulge {
    initialNode;
    currentNode;
    constructor() {
        this.index = 0;
        this.size = 0;
        this.isAvailable = true;
    }

    start(node) {
        this.index = 0;
        this.isAvailable = false;
        this.currentNode = node;
    }

    step(head, length) {
        this.size = (((length - this.index) / length) / 2) + 0.5;
        let node = head;

        for (let i = 0; i < this.index; i++) {
            if (node.next()) {
                node = node.next();
            }
        }

        this.currentNode = node;

        this.index++;

        if (this.index >= length) {
            this.reset();
        }
    }

    reset() {
        this.isAvailable = true;
        this.size = 0;
        this.index = 0;
    }

    getPosition() {
        return this.currentNode.value();
    }
}

export default Snake;