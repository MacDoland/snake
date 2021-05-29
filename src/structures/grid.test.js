import { expect } from '@jest/globals';
import Grid from './grid.js';

describe('Grid', () => {
    it('should create an array of expected length 4', () => {
        //Arrange
        //Act
        const grid = new Grid(2,2);

        //Assert
        expect(grid.getGrid().length).toEqual(4);
    });

    it('should create an array of expected length 0', () => {
        //Arrange
        //Act
        const grid = new Grid(0,0);

        //Assert
        expect(grid.getGrid().length).toEqual(0);
    });

    it('should create an array of expected length 0 when no col or row num passed', () => {
        //Arrange
        //Act
        const grid = new Grid(0,0);

        //Assert
        expect(grid.getGrid().length).toEqual(0);
    });

    describe('getIndex', () => {
        it('should return expected index 0 for x:0, y:0', () => {
            //Arrange
            const grid = new Grid(4,4);
            const expected = 0;

            //Act
            const actual = grid.getIndex(0, 0);

            //Assert
            expect(actual).toEqual(expected);
        });

        it('should return expected index 13 for x:1, y:3', () => {
            //Arrange
            const grid = new Grid(4,4);
            const expected = 13;

            //Act
            const actual = grid.getIndex(1, 3);

            //Assert
            expect(actual).toEqual(expected);
        });

        
        it('should return expected index 5 for x:2, y:2', () => {
            //Arrange
            const grid = new Grid(4,4);
            const expected = 10;

            //Act
            const actual = grid.getIndex(2, 2);

            //Assert
            expect(actual).toEqual(expected);
        });

        it('should return expected index 15 for x:3, y:3', () => {
            //Arrange
            const grid = new Grid(4,4);
            const expected = 15;

            //Act
            const actual = grid.getIndex(3, 3);

            //Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('getRandomIndex', () => {
        beforeEach(() => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0);
        });

        it('should return expected number', () => {
            //Arrange
            const grid = new Grid(4,4);
            const expected = 0;

            //Act
            const actual = grid.getRandomIndex();
            
    
            //Assert
            expect(actual).toEqual(expected);
        });

        it('should return expected number when 0 is excluded', () => {
            //Arrange
            const grid = new Grid(4,4);
            const expected = 1;

            //Act
            const actual = grid.getRandomIndex([0]);
            
    
            //Assert
            expect(actual).toEqual(expected);
        });

        it('should return expected number when range is excluded', () => {
            //Arrange
            const grid = new Grid(4,4);
            const expected = 2;

            //Act
            const actual = grid.getRandomIndex([0,1,4,5,10]);
            
    
            //Assert
            expect(actual).toEqual(expected);
        });


        afterEach(() => {
            jest.spyOn(global.Math, 'random').mockRestore();
        })
    })
})