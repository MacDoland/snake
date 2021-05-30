import directions from './direction.js';
import Snake from './snake.js';
import Vector from './structures/vector.js';

describe('Snake', () => {
    it('should initialise with 3 body segments', () => {
        //Arrange
        //Act
        const snake = new Snake(new Vector(4, 4));
        const body = snake.getBody();

        //Assert
        expect(body.length).toEqual(3);
    });

    it('should initialise with 3 body segments in expected positions', () => {
        //Arrange
        //Act
        const snake = new Snake(new Vector(4, 4));
        const bodyPartA = snake.getBody().head;
        const bodyPartB = bodyPartA.next();
        const bodyPartC = bodyPartB.next();

        const bodyPartAPosition = bodyPartA.value().position;
        const bodyPartBPosition = bodyPartB.value().position;
        const bodyPartCPosition = bodyPartC.value().position;

        const expectedBodyPartAPosition = new Vector(4, 4);
        const expectedBodyPartBPosition = new Vector(4, 5);
        const expectedBodyPartCPosition = new Vector(4, 6);

        //Assert
        expect(bodyPartAPosition).toEqual(expectedBodyPartAPosition);
        expect(bodyPartBPosition).toEqual(expectedBodyPartBPosition);
        expect(bodyPartCPosition).toEqual(expectedBodyPartCPosition);
    });

    it('should move all body parts in UP direction', () => {
        //Arrange
        const snake = new Snake(new Vector(4, 4));
        const bodyPartA = snake.getBody().head;
        const bodyPartB = bodyPartA.next();
        const bodyPartC = bodyPartB.next();
        snake.changeDirection(directions.UP);

        //Act
        snake.move();

        const bodyPartAPosition = bodyPartA.value().position;
        const bodyPartBPosition = bodyPartB.value().position;
        const bodyPartCPosition = bodyPartC.value().position;

        const expectedBodyPartAPosition = new Vector(4, 3);
        const expectedBodyPartBPosition = new Vector(4, 4);
        const expectedBodyPartCPosition = new Vector(4, 5);

        //Assert
        expect(bodyPartAPosition).toEqual(expectedBodyPartAPosition);
        expect(bodyPartBPosition).toEqual(expectedBodyPartBPosition);
        expect(bodyPartCPosition).toEqual(expectedBodyPartCPosition);
    });

    it('should move all body parts in LEFT direction', () => {
        //Arrange
        const snake = new Snake(new Vector(4, 4));
        const bodyPartA = snake.getBody().head;
        const bodyPartB = bodyPartA.next();
        const bodyPartC = bodyPartB.next();
        snake.changeDirection(directions.LEFT);

        //Act
        snake.move();

        const bodyPartAPosition = bodyPartA.value().position;
        const bodyPartBPosition = bodyPartB.value().position;
        const bodyPartCPosition = bodyPartC.value().position;

        const expectedBodyPartAPosition = new Vector(3, 4);
        const expectedBodyPartBPosition = new Vector(4, 4);
        const expectedBodyPartCPosition = new Vector(4, 5);

        //Assert
        expect(bodyPartAPosition).toEqual(expectedBodyPartAPosition);
        expect(bodyPartBPosition).toEqual(expectedBodyPartBPosition);
        expect(bodyPartCPosition).toEqual(expectedBodyPartCPosition);
    });

    it('should move all body parts in RIGHT direction', () => {
        //Arrange
        const snake = new Snake(new Vector(4, 4));
        const bodyPartA = snake.getBody().head;
        const bodyPartB = bodyPartA.next();
        const bodyPartC = bodyPartB.next();
        snake.changeDirection(directions.RIGHT);

        //Act
        snake.move();

        const bodyPartAPosition = bodyPartA.value().position;
        const bodyPartBPosition = bodyPartB.value().position;
        const bodyPartCPosition = bodyPartC.value().position;

        const expectedBodyPartAPosition = new Vector(5, 4);
        const expectedBodyPartBPosition = new Vector(4, 4);
        const expectedBodyPartCPosition = new Vector(4, 5);

        //Assert
        expect(bodyPartAPosition).toEqual(expectedBodyPartAPosition);
        expect(bodyPartBPosition).toEqual(expectedBodyPartBPosition);
        expect(bodyPartCPosition).toEqual(expectedBodyPartCPosition);
    });

    it('should move all body parts in DOWN direction', () => {
        //Arrange
        const snake = new Snake(new Vector(4, 4), directions.LEFT);
        const bodyPartA = snake.getBody().head;
        const bodyPartB = bodyPartA.next();
        const bodyPartC = bodyPartB.next();
        snake.changeDirection(directions.DOWN);

        //Act
        snake.move();

        const bodyPartAPosition = bodyPartA.value().position;
        const bodyPartBPosition = bodyPartB.value().position;
        const bodyPartCPosition = bodyPartC.value().position;

        const expectedBodyPartAPosition = new Vector(4, 5);
        const expectedBodyPartBPosition = new Vector(4, 4);
        const expectedBodyPartCPosition = new Vector(5, 4);

        //Assert
        expect(bodyPartAPosition).toEqual(expectedBodyPartAPosition);
        expect(bodyPartBPosition).toEqual(expectedBodyPartBPosition);
        expect(bodyPartCPosition).toEqual(expectedBodyPartCPosition);
    });

    it('should end up in start location after circle of moves', () => {
        //Arrange
        const snake = new Snake(new Vector(10, 10));
        const bodyPartA = snake.getBody().head;
        const bodyPartB = bodyPartA.next();
        const bodyPartC = bodyPartB.next();
        

        //Act
        snake.changeDirection(directions.LEFT);
        snake.move();
        snake.move();
        snake.move();
        snake.changeDirection(directions.DOWN);
        snake.move();
        snake.move();
        snake.move();
        snake.changeDirection(directions.RIGHT);
        snake.move();
        snake.move();
        snake.move();
        snake.changeDirection(directions.UP);
        snake.move();
        snake.move();
        snake.move();


        const bodyPartAPosition = bodyPartA.value().position;
        const bodyPartBPosition = bodyPartB.value().position;
        const bodyPartCPosition = bodyPartC.value().position;

        const expectedBodyPartAPosition = new Vector(10, 10);
        const expectedBodyPartBPosition = new Vector(10, 11);
        const expectedBodyPartCPosition = new Vector(10, 12);

        //Assert
        expect(bodyPartAPosition).toEqual(expectedBodyPartAPosition);
        expect(bodyPartBPosition).toEqual(expectedBodyPartBPosition);
        expect(bodyPartCPosition).toEqual(expectedBodyPartCPosition);
    });


    it('should end up in expected location after series of moves', () => {
        //Arrange
        const snake = new Snake(new Vector(10, 10));
        const bodyPartA = snake.getBody().head;
        const bodyPartB = bodyPartA.next();
        const bodyPartC = bodyPartB.next();
        

        //Act
        snake.changeDirection(directions.LEFT);
        snake.move();
        snake.move();
        snake.move();
        snake.changeDirection(directions.DOWN);
        snake.move();
        snake.move();
        snake.move();
        snake.changeDirection(directions.LEFT);
        snake.move();
        snake.move();
        snake.move();
        snake.changeDirection(directions.UP);
        snake.move();
        snake.move();
        snake.move();


        const bodyPartAPosition = bodyPartA.value().position;
        const bodyPartBPosition = bodyPartB.value().position;
        const bodyPartCPosition = bodyPartC.value().position;

        const expectedBodyPartAPosition = new Vector(4, 10);
        const expectedBodyPartBPosition = new Vector(4, 11);
        const expectedBodyPartCPosition = new Vector(4, 12);

        //Assert
        expect(bodyPartAPosition).toEqual(expectedBodyPartAPosition);
        expect(bodyPartBPosition).toEqual(expectedBodyPartBPosition);
        expect(bodyPartCPosition).toEqual(expectedBodyPartCPosition);
    });


    describe('changeDirection', () => {
        it('should change direction when newDirection is not opposite', () => {
            //Arrange
            const snake = new Snake(new Vector(3, 3), directions.UP);

            //Act
            snake.changeDirection(directions.LEFT);

            //Assert
            expect(snake.getDirection()).toEqual(directions.LEFT);
        })
    })
})