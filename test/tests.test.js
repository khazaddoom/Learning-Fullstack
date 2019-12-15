const calculateSquare = require('../test');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('calculateSquare', function() {
    it('should resolve with number 4 if passed number 2', function() {
        return expect(calculateSquare(2)).eventually.be.equal(4);
    })
});

describe('calculateSquare', function() {
    it('should reject if passed a non number', function() {
        return expect(calculateSquare('2')).rejected
    })
});

describe('calculateSquare', function() {
    it('should become fulfilled with a number if passed any number', function() {
        return expect(calculateSquare(100)).fulfilled
    })
});



