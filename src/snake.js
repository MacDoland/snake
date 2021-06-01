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
        this.#body.push(new SnakeSegment(this.#initialPosition));
        let offset;

        for (let i = 1; i < this.#initialLength; i++) {
            offset = Vector.multiplyScalar(directionVector, i);
            this.#body.push(new SnakeSegment(Vector.add(this.#initialPosition, offset)));
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
        let currentPosition = node.value().position;
        let newPosition = Vector.add(currentPosition, directionVector);
        this.#body.unshift({ position: newPosition }); // add new head
        this.#direction = this.#nextDirection;

        //progress any bulges
        this.#bulges.filter((bulge) => !bulge.isAvailable).forEach((bulge) => bulge.step());
    }

    eat() {
        this.#eventDispatcher.dispatch(this.#events.EAT, this.#body.length);

        //if no available bulges then create one
        const availableBulges = this.#bulges.filter((bulge) => bulge.isAvailable);

        if (availableBulges.length > 0) {
            availableBulges[0].move(this.#body.head.next());
        }
        else {
            const bulge = new SnakeBulge();
            bulge.move(this.#body.head.next());
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

class SnakeSegment {
    constructor(position) {
        this.position = position;
    }
}

class SnakeBulge {
    #generator;
    initialNode;
    currentNode;
    constructor() {
        this.size = 0;
        this.isAvailable = true;
        this.#generator = this.bulgeGenerator();
    }

    move(node) {
        this.currentNode = node;
        this.initialNode = node;
        this.isAvailable = false;
        this.size = this.#generator.next().value;
    }

    step() {
        this.size = this.#generator.next().value;

        if (this.currentNode.next()) {
            this.currentNode = this.currentNode.next();
        }

        if (this.size <= .25) {
            this.reset();
        }
    }

    reset() {
        this.isAvailable = true;
        this.size = 0;
        this.#generator =  this.bulgeGenerator();
        this.currentNode = this.initialNode;
    }

    getPosition() {
        return this.currentNode.value().position;
    }

    /* bulge generator */
    * bulgeGenerator() {
        yield 1;
        yield 0.75;
        yield 0.5;
        yield 0.25;
    }
}

export default Snake;