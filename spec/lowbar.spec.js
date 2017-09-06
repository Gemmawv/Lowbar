/* global describe, it */
const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require(path.join(__dirname, '..', './lowbar.js'));

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
    it('should return an empty array if given an invalid data type', function () {
      expect(_.map(10, function (num) { return num * 2; })).to.eql([]);
      expect(_.map(true, function (bool) { return bool === true; })).to.eql([]);
    });
    it('should produce a new array of values by mapping each value in the list through a transformation function (iteratee)', function () {
      expect(_.map([1, 2, 3], function (num) { return num * 3; })).to.eql([3, 6, 9]);
      expect(_.map({ a: 23, b: 99, c: 14 }, function (num) { return num - 2; })).to.eql([21, 97, 12]);
      expect(_.map('abc', function (char) { return char === 'b'; })).to.eql([false, true, false]);
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

  describe('#pluck', function () {
    it('should be a function', function () {
      expect(_.pluck).to.be.a('function');
    });
    it('should return an empty array or undefined if given an invalid data type', function () {
      expect(_.pluck(98765, 7)).to.eql([]);
      expect(_.pluck(true, true)).to.eql([]);
      expect(_.pluck('cat', 'a')).to.eql([undefined, undefined, undefined]);
      let person = { name: 'zach', age: 40, occupation: 'hairdresser' };
      expect(_.pluck(person, 'occupation')).to.eql([undefined, undefined, undefined]);
    });
    it('should return a list of property values whose key matches the propertyName given', function () {
      let pets = [{ name: 'Nellie', age: 3 }, { name: 'Soo', age: 4 }, { name: 'Eric', age: 7 }];
      expect(_.pluck(pets, 'name')).to.eql(['Nellie', 'Soo', 'Eric']);
      let person = [{ name: 'Pat', age: 40, occupation: 'Postal worker' }];
      expect(_.pluck(person, 'age')).to.eql([40]);
    });
  });

  describe('#reduce', function () {
    it('should be a function', function () {
      expect(_.reduce).to.be.a('function');
    });
    it('should return memo if given an invalid data type', function () {
      expect(_.reduce(123, function (memo, num) { return memo + num; }, 0)).to.equal(0);
      expect(_.reduce(true, function (memo, bool) { if (bool === true) { return memo + 5; } }, 0)).to.equal(0);
    });
    it('should reduce the list to a single value', function () {
      expect(_.reduce([1, 2, 3], function (memo, num) { return memo + num; }, 0)).to.equal(6);
      expect(_.reduce({ a: 10, b: 20, c: 30 }, function (memo, num) { return memo + num; })).to.equal(60);
      expect(_.reduce('Gemma', function (memo, char) { if (char === 'm') memo.push(char); return memo; }, [])).to.eql(['m', 'm']);
    });
    it('should use the first item in the list as memo if no memo is passed', function () {
      expect(_.reduce([2, 4, 6, 8], function (memo, num) { return memo + num; })).to.equal(20);
      expect(_.reduce({ a: 3, b: 6, c: 9 }, function (memo, num) { return memo + num; })).to.equal(18);
    });
  });

  describe('#every', function () {
    it('should be a function', function () {
      expect(_.every).to.be.a('function');
    });
    it('should return true when given an invalid data type', function () {
      expect(_.every(400, function (num) { return num < 100; })).to.equal(true);
      expect(_.every(false, function (bool) { return bool === true; })).to.equal(true);
    });
    it('should return true if all values in the list pass the predicate truth test', function () {
      expect(_.every([2, 4, 6, 8], function (num) { return num % 2 === 0; })).to.equal(true);
      expect(_.every({ a: 20, b: 30, c: 40 }, function (num) { return num > 10; })).to.equal(true);
      expect(_.every('Nellie', function (char) { return char !== 'm'; })).to.equal(true);
    });
    it('should return false if any value in the list does not pass the predicate truth test', function () {
      expect(_.every([1, 2, 3, 4, 5], function (num) { return num < 4; })).to.equal(false);
      expect(_.every({ a: 5, b: 10, c: 15 }, function (num) { return num % 2 === 0; })).to.equal(false);
      expect(_.every('moonbeam', function (char) { return char === 'o'; })).to.equal(false);
    });
  });

  describe('#some', function () {
    it('should be a function', function () {
      expect(_.some).to.be.a('function');
    });
    it('should return false if given an invalid data type', function () {
      expect(_.some(300, function (num) { return num > 100; })).to.equal(false);
      expect(_.some(true, function (bool) { return bool === true; })).to.equal(false);
    });
    it('should return true if any values in the list pass the predicate truth test', function () {
      expect(_.some([2, 4, 5], function (num) { return num % 2 === 0; })).to.equal(true);
      expect(_.some('yellow', function (char) { return char === 'l'; })).to.equal(true);
      expect(_.some({ a: 2, b: 5, c: 10 }, function (num) { return num > 5; })).to.equal(true);
    });
    it('should return false if no values in the list pass the predicate truth test', function () {
      expect(_.some([1, 3, 6], function (num) { return num > 9; })).to.equal(false);
      expect(_.some('orange', function (char) { return char === 'l'; })).to.equal(false);
      expect(_.some({ a: 3, b: 17, c: 10 }, function (num) { return num % 6 === 0; })).to.equal(false);
    });
  });

  describe('#extend', function () {
    it('should be a function', function () {
      expect(_.extend).to.be.a('function');
    });
    it('should return destination if given an invalid data type', function () {
      expect(_.extend(123, { num: 456 })).to.equal(123);
      expect(_.extend(123, 456)).to.equal(123);
      expect(_.extend('banana', { fruit: 'coconut' })).to.equal('banana');
      expect(_.extend('banana', 'coconut')).to.equal('banana');
      expect(_.extend(true, { bool: false })).to.equal(true);
      expect(_.extend(true, false)).to.equal(true);
    });
    it('should replace a value in the destination array with the value of the same index from the source array(s). The last source will override properties of the same index in previous arguments', function () {
      expect(_.extend(['purple', 'blue', 'green'], ['red'])).to.eql(['red', 'blue', 'green']);
      expect(_.extend(['purple', 'blue', 'green'], ['red', 'orange'], ['yellow'])).to.eql(['yellow', 'orange', 'green']);
      expect(_.extend(['red', 'orange', 'blue'], ['black', 'white', ['pink']], ['yellow'])).to.eql(['yellow', 'white', ['pink']]);
    });
    it('should copy all of the properties in the source object(s) over to the destination object, and return the destination object', function () {
      expect(_.extend({ name: 'Eric', age: 7 }, { breed: 'border terrier' })).to.eql({ name: 'Eric', age: 7, breed: 'border terrier' });
      expect(_.extend({ name: 'Nellie' }, { age: 3 }, { paws: 4 })).to.eql({ name: 'Nellie', age: 3, paws: 4 });
      expect(_.extend({ name: 'Nellie' }, { age: 3, description: { colour: 'tabby', paws: 4 } })).to.eql({ name: 'Nellie', age: 3, description: { colour: 'tabby', paws: 4 } });
      expect(_.extend({}, { type: 'fruit', name: 'strawberry' }, { colour: 'red' })).to.eql({ type: 'fruit', name: 'strawberry', colour: 'red' });
    });
    it('should copy all of the properties in the source object to the destination object, with the last source overriding properties of the same name in previous arguments', function () {
      expect(_.extend({ type: 'fruit', name: 'banana' }, { name: 'mango' })).to.eql({ type: 'fruit', name: 'mango' });
      expect(_.extend({ type: 'chocolate', name: 'maltesers' }, { name: 'flake', price: '60p' }, { name: 'twirl' })).to.eql({ type: 'chocolate', name: 'twirl', price: '60p' });
    });
    it('should copy all of the properties in the source objects over to the destination array, and return the destination array', function () {
      let expected = ['Nellie', 3];
      expected.colour = 'tabby';
      expect(_.extend(['Nellie', 3], { colour: 'tabby' })).to.eql(expected);
    });
  });

  describe('#defaults', function () {
    it('should be a function', function () {
      expect(_.defaults).to.be.a('function');
    });
    it('should return the object when given an invalid data type', function () {
      expect(_.defaults(1234, 5678)).to.equal(1234);
      expect(_.defaults(9876, { number: 5432 })).to.equal(9876);
      expect(_.defaults('pineapple', 'coconut')).to.equal('pineapple');
      expect(_.defaults('pineapple', { type: 'coconut' })).to.equal('pineapple');
      expect(_.defaults(true, false)).to.equal(true);
      expect(_.defaults(true, { isTrue: false })).to.equal(true);
    });
    it('should return the array with any unfilled index positions corresponding to index positions in any defaults array(s), being updated with those values', function () {
      expect(_.defaults(['banana', 'coconut'], ['pineapple', 'orange', 'cauliflower', 'grapes'])).to.eql(['banana', 'coconut', 'cauliflower', 'grapes']);
      expect(_.defaults(['gold'], ['gold', 'silver', 'bronze'], ['pink', 'purple', 'black', 'white'])).to.eql(['gold', 'silver', 'bronze', 'white']);
      expect(_.defaults(['red', 'orange'], ['black', 'white', ['pink']], ['yellow'])).to.eql(['red', 'orange', ['pink']]);
    });
    it('should return the object with any undefined properties filled in with the first value present in the default object', function () {
      expect(_.defaults({ flavour: 'chocolate' }, { flavour: 'vanilla', sprinkles: 'lots' })).to.eql({ flavour: 'chocolate', sprinkles: 'lots' });
    });
    it('should return the object with undefined properties filled in with the first value present in a list of defaults objects', function () {
      expect(_.defaults({ flavour: 'chocolate' }, { flavour: 'vanilla', sprinkles: 'lots' }, { flavour: 'pistachio', syrup: 'strawberry' })).to.eql({ flavour: 'chocolate', sprinkles: 'lots', syrup: 'strawberry' });
    });
    it('should return the array with any undefined values filled in with corresponding information from the defaults object(s)', function () {
      let expected = ['cat', 'dog'];
      expected.pet = 'parrot';
      expect(_.defaults(['cat', 'dog'], { pet: 'parrot' })).to.eql(expected);
    });
  });


  describe('#once', function () {
    it('should be a function', function () {
      expect(_.once).to.be.a('function');
    });
    it('should only allow the function to be called once', function () {
      let mySpy = sinon.spy();
      let mySpyOnce = _.once(mySpy);
      mySpyOnce();
      mySpyOnce();
      mySpyOnce();
      expect(mySpy.callCount).to.equal(1);
    });
    it('should forward all the arguments from the returned function to the original function', function () {
      let mySpy = sinon.spy();
      let mySpyOnce = _.once(mySpy);
      mySpyOnce(1, 2, 3);
      expect(mySpy.calledWithExactly(1, 2, 3)).to.equal(true);
    });
    it('should always return the result of the first invocation', function () {
      let identityOnce = _.once(_.identity);
      let results = [];
      results.push(identityOnce(1));
      results.push(identityOnce(2));
      results.push(identityOnce(3));
      expect(results).to.eql([1, 1, 1]);
    });
  });

  describe('#memoize', function () {
    it('should be a function', function () {
      expect(_.memoize).to.be.a('function');
    });
    it('should return the same value as the original function', function () {
      const double = function (num) { return num * 2; };
      const memoizeDouble = _.memoize(double);
      expect(memoizeDouble(3)).to.eql(double(3));
      expect(memoizeDouble(3)).to.eql(double(3));
      expect(memoizeDouble(3)).to.eql(double(3));
    });
    it('should only call the given function once when called multiple times with the same first argument', function () {
      let counter = 0;
      const updateCounter = function (num) { return counter += num; };
      const memoizeUpdateCounter = _.memoize(updateCounter);
      memoizeUpdateCounter(1);
      memoizeUpdateCounter(1);
      memoizeUpdateCounter(1);
      expect(counter).to.equal(1);
    });
    it('should call the given function every time it is given a unique first argument', function () {
      const double = function (num) { return num * 2; };
      const mySpy = sinon.spy(double);
      const mySpyMemoize = _.memoize(mySpy);
      mySpyMemoize(1);
      mySpyMemoize(2);
      mySpyMemoize(3);
      expect(mySpy.callCount).to.equal(3);
    });
    it('should have access to multiple arguments passed in to the given function', function () {
      const add = function (a, b) { return a + b; };
      const mySpy = sinon.spy(add);
      const mySpyMemoize = _.memoize(mySpy);
      mySpyMemoize(2, 3);
      expect(mySpy.calledWithExactly(2, 3)).to.equal(true);
    });
    it('should use the hashFunction given to generate keys for the cached results', function () {
      const add = function (a, b) { return a + b; };
      function commaSeparateArgs() {
        const args = [];
        for (let i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        return args.join(',');
      }
      const memoizeAdd = _.memoize(add, commaSeparateArgs);
      expect(memoizeAdd(4, 1)).to.equal(5);
      expect(memoizeAdd(4, 2)).to.equal(6);
    });
  });

  describe('#shuffle', function () {
    it('should be a function', function () {
      expect(_.shuffle).to.be.a('function');
    });
    it('should return an empty array when given an invalid data type', function () {
      expect(_.shuffle(123456)).to.eql([]);
      expect(_.shuffle(true)).to.eql([]);
    });
    it('should return a shuffled list of the same length as the original list', function () {
      let arr = [1, 2, 3, 4, 5, 6];
      expect(_.shuffle(arr)).to.have.lengthOf(6);
      expect(_.shuffle(arr)).to.be.an('array');
    });
    it('should shuffle the order of values in the list each time it is called', function () {
      let arr = [1, 2, 3, 4, 5, 6];
      let shuffle1 = _.shuffle(arr);
      let shuffle2 = _.shuffle(arr);
      expect(shuffle1).to.be.an('array');
      expect(shuffle2).to.be.an('array');
      expect(shuffle1).to.not.equal(shuffle2);
    });
    it('when given a string, should return an array of characters of the same length as the original string', function () {
      let str = 'Shuffle this!';
      expect(_.shuffle(str)).to.be.an('array');
      expect(_.shuffle(str)).to.have.lengthOf(13);
    });
    it('when given a string, should shuffle the order of characters each time it is called', function () {
      let str = 'Shuffle this!';
      let shuffledStr1 = _.shuffle(str);
      let shuffledStr2 = _.shuffle(str);
      expect(shuffledStr1).to.be.an('array');
      expect(shuffledStr2).to.be.an('array');
      expect(shuffledStr1).to.not.equal(shuffledStr2);
    });
    it('when given an object, should return an array of values, the same length as the original object', function () {
      let obj = { a: 23, b: 'cat', c: 5, d: '19', e: 'dog' };
      let shuffledObj1 = _.shuffle(obj);
      let shuffledObj2 = _.shuffle(obj);
      expect(shuffledObj1.length).to.equal(shuffledObj2.length);
    });
    it('when given an object, should shuffle the order of values each time it is called', function () {
      let obj = { a: 999, b: 'banana', c: 'coconut', d: 87, e: 123 };
      let shuffledObj1 = _.shuffle(obj);
      let shuffledObj2 = _.shuffle(obj);
      expect(shuffledObj1).to.be.an('array');
      expect(shuffledObj2).to.be.an('array');
      expect(shuffledObj1).to.not.equal(shuffledObj2);
    });
  });

  describe('#invoke', function () {
    it('should be a function', function () {
      expect(_.invoke).to.be.a('function');
    });
    it('should return an empty array if given an invalid data type', function () {
      expect(_.invoke(6413, 'sort')).to.eql([]);
      expect(_.invoke(false, 'sort')).to.eql([]);
      expect(_.invoke('string', 'sort')).to.eql([]);
    });
    it('should return a sorted list of values when passed methodName sort', function () {
      expect(_.invoke([[5, 1, 7], [3, 2, 1]], 'sort')).to.eql([[1, 5, 7], [1, 2, 3]]);
      expect(_.invoke([['string', 'this', 'reverse'], ['one!', 'this', 'and', '...']], 'reverse')).to.eql([['reverse', 'this', 'string'], ['...', 'and', 'this', 'one!']]);
    });
    it('should return an array of stringified object values when passed an object and methodName toString', function () {
      expect(_.invoke({ a: 954, b: 12, c: 145, d: 802 }, 'toString')).to.eql(['954', '12', '145', '802']);
    });
    it('should forward any other arguments to the methodName and call that method on each value in the list', function () {
      expect(_.invoke([['zero', 'one', 'two', 'three', 'four'], ['two', 'three', 'four', 'five']], 'slice', 1, 3)).to.eql([['one', 'two'], ['three', 'four']]);
    });
  });

  describe('#sortBy', function () {
    it('should be a function', function () {
      expect(_.sortBy).to.be.a('function');
    });
    it('should return an empty array if given an invalid data type', function () {
      expect(_.sortBy(3214, function (num) { return num * 2; })).to.eql([]);
      expect(_.sortBy(false, function (bool) { return bool === true; })).to.eql([]);
    });
    it('should return a sorted copy of a list ranked in ascending order of the results of running each item through the given iteratee function', function () {
      const iteratee = function (num) { return Math.sin(num); };
      expect(_.sortBy([1, 2, 3, 4, 5, 6], iteratee)).to.eql([5, 4, 6, 3, 1, 2]);
    });
    it('should return a sorted copy of a string ranked in order of the results of running each character through the given iteratee function', function () {
      const iteratee = function (char) { return char.charCodeAt(); };
      expect(_.sortBy('string', iteratee)).to.eql(['g', 'i', 'n', 'r', 's', 't']);
    });
    it('should return a copy of an object sorted by the given property name', function () {
      const pets = [{ name: 'Soo', age: 4 }, { name: 'Eric', age: 7 }, { name: 'Nellie', age: 3 }];
      expect(_.sortBy(pets, 'name')).to.eql([{ name: 'Eric', age: 7 }, { name: 'Nellie', age: 3 }, { name: 'Soo', age: 4 }]);
    });
  });

  describe('#zip', function () {
    it('should be a function', function () {
      expect(_.zip).to.be.a('function');
    });
    it('should return an empty array when given an invalid data type', function () {
      expect(_.zip(true)).to.eql([]);
      expect(_.zip(1234)).to.eql([]);
    });
    it('should merge together the values of each of the given arrays with the values at the corresponding position', function () {
      expect(_.zip(['blue', 'red', 'yellow'], [30, 40, 50], [true, false, false])).to.eql([['blue', 30, true], ['red', 40, false], ['yellow', 50, false]]);
    });
    it('should merge together the values of each of the given strings with the values at the corresponding position', function () {
      expect(_.zip('green', 'white', 'black')).to.eql([['g', 'w', 'b'], ['r', 'h', 'l'], ['e', 'i', 'a'], ['e', 't', 'c'], ['n', 'e', 'k']]);
    });
  });

  describe.only('#sortedIndex', function () {
    it('should be a function', function () {
      expect(_.sortedIndex).to.be.a('function');
    });
    it('should return 0 if given an invalid data type', function () {
      expect(_.sortedIndex(1345, 2)).to.equal(0);
      expect(_.sortedIndex(true, false)).to.equal(0);
      expect(_.sortedIndex({ a: 2, b: 4, c: 6, d: 10 }, { e: 8 })).to.equal(0);
    });
    it('should return the index at which the value should be inserted into the sorted list', function () {
      expect(_.sortedIndex([10, 20, 30, 40, 50], 35)).to.equal(3);
      expect(_.sortedIndex(['a', 'e', 'o', 'u'], 'i')).to.equal(2);
    });
  });
});
