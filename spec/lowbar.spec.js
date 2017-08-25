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
      _.each({ a: 1, b: 2, c: 3 }, function () { return count += 1; });
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
  describe('#indexOf', function () {
    it('is a function', function () {
      expect(_.indexOf).to.be.a('function');
    });
    it('should return -1 if given an invalid data type', function () {
      expect(_.indexOf({ a: 1, b: 2, c: 3 }, 3)).to.equal(-1);
      expect(_.indexOf(12345, 5)).to.equal(-1);
      expect(_.indexOf(true, true)).to.equal(-1);
    });
    it('should return the index at which the value can be found in the array or -1 if value is not present in the array', function () {
      expect(_.indexOf([1, 2, 3, 4, 5], 4)).to.equal(3);
      expect(_.indexOf([2, 4, 6, 8, 10], 3)).to.equal(-1);
      expect(_.indexOf([3, 6, 9, 12, 15, 18], 6)).to.equal(1);
    });
    it('should return the index at which the value can be found in the array when given a third isSorted argument. Returns -1 if value is not present in the array', function () {
      expect(_.indexOf([1, 2, 3, 4, 5], 4, true)).to.equal(3);
      expect(_.indexOf([2, 4, 6, 8, 10], 3, true)).to.equal(-1);
      expect(_.indexOf([3, 6, 9, 12, 15, 18], 6, true)).to.equal(1);
      expect(_.indexOf([12, 6, 9, 1, 45], 6, false)).to.equal(1);
    });
    it('should return the index at which the value can be found in the string or -1 if value is not present in the string', function () {
      expect(_.indexOf('abcde', 'e')).to.equal(4);
      expect(_.indexOf('Northcoders', 'b')).to.equal(-1);
      expect(_.indexOf('Thundercats', 'u')).to.equal(2);
    });
    it('should return the index at which the value can be found in the string when given a third isSorted argument. Returns -1 if value is not present in the string', function () {
      expect(_.indexOf('ABC', 'A', true)).to.equal(0);
      expect(_.indexOf('wxyz', 'b', true)).to.equal(-1);
      expect(_.indexOf('abcdefghij', 'g', true)).to.equal(6);
      expect(_.indexOf('Thundercats', 'u', false)).to.equal(2);
    });
  });
  describe('#filter', function () {
    it('is a function', function () {
      expect(_.filter).to.be.a('function');
    });
    it('should return an empty array when provided with an invalid data type', function () {
      expect(_.filter(123, function (num) { return num > 2; })).to.eql([]);
      expect(_.filter(true, function (bool) { return bool === true; })).to.eql([]);
    });
    it('should return a filtered list containing only the values that pass the truth test (predicate)', function () {
      expect(_.filter([1, 2, 3, 4, 5, 6], function (num) { return num % 2 === 0; })).to.eql([2, 4, 6]);
      expect(_.filter({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }, function (num) { return num % 2 !== 0; })).to.eql([1, 3, 5]);
      expect(_.filter('Gemma', function (char) { return char === 'm'; })).to.eql(['m', 'm']);
    });
  });
  describe('#reject', function () {
    it('is a function', function () {
      expect(_.reject).to.be.a('function');
    });
    it('should return an empty array when provided with an invalid data type', function () {
      expect(_.reject(123, function (num) { return num < 2; })).to.eql([]);
      expect(_.reject(false, function (bool) { return bool === true; })).to.eql([]);
    });
    it('should return all values in the list that do not pass the truth test (predicate)', function () {
      expect(_.reject([1, 2, 3, 4, 5, 6], function (num) { return num % 2 === 0; })).to.eql([1, 3, 5]);
      expect(_.reject({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }, function (num) { return num % 2 !== 0; })).to.eql([2, 4, 6]);
      expect(_.reject('Northcoders', function (char) { return char === 'o'; })).to.eql(['N', 'r', 't', 'h', 'c', 'd', 'e', 'r', 's']);
    });
  });
  describe('#uniq', function () {
    it('is a function', function () {
      expect(_.uniq).to.be.a('function');
    });
    it('should return an empty array when given an invalid data type', function () {
      expect(_.uniq({ a: 2, b: 2, c: 1, d: 3, e: 4, f: 3 })).to.eql([]);
      expect(_.uniq(13212)).to.eql([]);
      expect(_.uniq(true, true, false)).to.eql([]);
    });
    it('should produce a duplicate free version of the array in which only the first instance of each value is kept', function () {
      expect(_.uniq([1, 2, 1, 4, 1, 3])).to.eql([1, 2, 4, 3]);
      expect(_.uniq([31, 32, 32, 34, 41, 41])).to.eql([31, 32, 34, 41]);
    });
    it('should produce a duplicate free version of the array when given a second isSorted argument', function () {
      expect(_.uniq([1, 2, 1, 4, 1, 3], false)).to.eql([1, 2, 4, 3]);
      expect(_.uniq([31, 32, 32, 34, 41, 41], true)).to.eql([31, 32, 34, 41]);
      expect(_.uniq([111, 123, 123, 156, 159, 191, 191], true)).to.eql([111, 123, 156, 159, 191]);
    });
    it('should produce a duplicate free version of the string in which only the first instance of each value is kept', function () {
      expect(_.uniq('Only unique values please!')).to.eql(['O', 'n', 'l', 'y', ' ', 'u', 'i', 'q', 'e', 'v', 'a', 's', 'p', '!']);
      expect(_.uniq('abbcddddefffghh')).to.eql(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
    });
    it('should produce a duplicate free version of the string when given a second isSorted argument', function () {
      expect(_.uniq('Only unique values please!', false)).to.eql(['O', 'n', 'l', 'y', ' ', 'u', 'i', 'q', 'e', 'v', 'a', 's', 'p', '!']);
      expect(_.uniq('abbcddddefffghh', true)).to.eql(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
      expect(_.uniq('wxxxxxxxxxxxxyz', true)).to.eql(['w', 'x', 'y', 'z']);
    });
  });
  describe('#map', function () {
    it('is a function', function () {
      expect(_.map).to.be.a('function');
    });
    it('should produce a new array of values by mapping each value in the list through a transformation function (iteratee)', function () {
      expect(_.map([1, 2, 3], function (num) { return num * 3; })).to.eql([3, 6, 9]);
    });
  });
  describe('#contains', function () {
    it('is a function', function () {
      expect(_.contains).to.be.a('function');
    });
    it('should return false if given an invalid data type', function () {
      expect(_.contains(123, 3)).to.equal(false);
      expect(_.contains(false, false)).to.equal(false);
    });
    it('should return true if the value is present in the list or string', function () {
      expect(_.contains([1, 2, 3], 3)).to.equal(true);
      expect(_.contains('elephant', 't')).to.equal(true);
      expect(_.contains({ a: 21, b: 22, c: 23 }, 21)).to.equal(true);
    });
    it('should return false if the value is not present in the list or string', function () {
      expect(_.contains([2, 4, 6], 5)).to.equal(false);
      expect(_.contains('zebra', 's')).to.equal(false);
      expect(_.contains({ a: 14, b: 25, c: 3 }, 29)).to.equal(false);
    });
    it('should return the correct result when a third fromIndex argument is given', function () {
      expect(_.contains([2, 4, 6, 8, 10, 12, 14], 12, 3)).to.equal(true);
      expect(_.contains([22, 41, 6, 110, 44, 17, 3], 41, 3)).to.equal(false);
      expect(_.contains([22, 41, 6, 110, 44, 17, 3], 105, 2)).to.equal(false);
      expect(_.contains('hippopotamus', 's', 5)).to.equal(true);
      expect(_.contains('hippopotamus', 'p', 6)).to.equal(false);
      expect(_.contains('hippopotamus', 'l', 3)).to.equal(false);
    });
  });
  describe('#reduce', function () {
    it('should be a function', function () {
      expect(_.reduce).to.be.a('function');
    });
    it('should reduce the list to a single value', function () {
      expect(_.reduce([1, 2, 3], function(memo, num) { return memo + num; }, 0)).to.equal(6);
    });
  });
});
