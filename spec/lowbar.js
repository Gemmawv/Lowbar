/* global describe, it */
var path = require('path');
var expect = require('chai').expect;

var _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
  });
  describe('#identity', function () {
    it('is a function', function () {
      expect(_.identity).to.be.a('function');
    });
    it('should return the value given', function () {
      expect(_.identity(98765)).to.equal(98765);
      expect(_.identity('Gemma')).to.equal('Gemma');
      expect(_.identity(true)).to.equal(true);
      expect(_.identity([1, 2, 3])).to.eql([1, 2, 3]);
      expect(_.identity({ a: 'one', b: 'two', c: 'three' })).to.eql({ a: 'one', b: 'two', c: 'three' });
    });
  });
  describe('#first', function () {
    it('is a function', function () {
      expect(_.first).to.be.a('function');
    });
    it('should return the first element in an array or string', function () {
      expect(_.first([5, 4, 3, 2, 1])).to.equal(5);
      expect(_.first('Gemma')).to.equal('G');
    });
    it('should not accept an invalid data type', function () {
      expect(_.first(379)).to.be.undefined;
      expect(_.first(379, 2)).to.be.undefined;
      expect(_.first(true)).to.be.undefined;
      expect(_.first(true, 1)).to.be.undefined;
      expect(_.first({ a: 5, b: 4, c: 3, d: 2, e: 1 })).to.be.undefined;
      expect(_.first({ a: 5, b: 4, c: 3, d: 2, e: 1 }, 2)).to.be.undefined;
    });
    it('should return the stated number of elements from the start of an array or string where a second argument is given', function () {
      expect(_.first([5, 4, 3, 2, 1], 3)).to.eql([5, 4, 3]);
      expect(_.first('Gemma', 3)).to.eql(['G', 'e', 'm']);
    });
  });
  describe('#last', function () {
    it('is a function', function () {
      expect(_.first).to.be.a('function');
    });
    it('should return the last element in array or string', function () {
      expect(_.last([5, 4, 3, 2, 1])).to.eql(1);
      expect(_.last('Gemma')).to.equal('a');
    });
    it('should not accept an invalid data type', function () {
      expect(_.last(123)).to.be.undefined;
      expect(_.last(false)).to.be.undefined;
      expect(_.last({ a: 5, b: 4, c: 3, d: 2, e: 1 })).to.be.undefined;
    });
    it('should return the stated number of elements from the end of an array or string when a second argument is given', function () {
      expect(_.last([5, 4, 3, 2, 1], 3)).to.eql([3, 2, 1]);
      expect(_.last('Gemma', 3)).to.eql(['m', 'm', 'a']);
    });
  });
  describe('#each', function () {
    it('is a function', function () {
      expect(_.each).to.be.a('function');
    });
    it('should return the list if not passed an iteratee argument', function () {
      expect(_.each([1, 2, 3])).to.eql([1, 2, 3]);
      expect(_.each({ a: 1, b: 2, c: 3 })).to.eql({ a: 1, b: 2, c: 3 });
      expect(_.each('gemma')).to.eql('gemma');
    });
    it('should iterate over an array of elements, yielding each in turn to the iteratee function provided', function () {
      var count = 0;
      _.each([10, 20, 30, 40], function () { return count += 1; });
      expect(count).to.equal(4);
    });
    it('should iterate over an object of elements, yielding each in turn to the iteratee function provided', function () {
      var count = 0;
      _.each({a:1, b:2, c:3}, function () { return count += 1; });
      expect(count).to.equal(3);
    });
    it('should iterate over a string, yielding each character in turn to the iteratee function provided', function () {
      var count = 0;
      _.each('gemma', function () { return count += 1; });
      expect(count).to.equal(5);
    });
    it('should return the list if given as an invalid data type', function () {
      var count = 0;
      expect(_.each(true, function () { return count += 1; })).to.equal(true);
      expect(_.each(12345, function () { return count += 1; })).to.equal(12345);
      expect(_.each(null, function () { return count += 1; })).to.equal(null);
      expect(count).to.equal(0);
    });
  });
});
