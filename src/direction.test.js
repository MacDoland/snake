import directions, { isDirection } from './direction';

describe('isDirection', () => {
    it('should return true when valid direction UP', () => {
        //Arrange
        const direction = directions.UP;

        //Act
        const actual = isDirection(direction);

        //Assert
        expect(actual).toBe(true);
    });
    it('should return true when valid direction RIGHT', () => {
        //Arrange
        const direction = directions.RIGHT;

        //Act
        const actual = isDirection(direction);

        //Assert
        expect(actual).toBe(true);
    });

    it('should return true when valid direction DOWN', () => {
        //Arrange
        const direction = directions.DOWN;

        //Act
        const actual = isDirection(direction);

        //Assert
        expect(actual).toBe(true);
    });

    it('should return true when valid direction LEFT', () => {
        //Arrange
        const direction = directions.LEFT;

        //Act
        const actual = isDirection(direction);

        //Assert
        expect(actual).toBe(true);
    });


})