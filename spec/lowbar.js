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
      expect(_.first(true)).to.be.undefined;
      expect(_.first({a:5, b:4, c:3, d:2, e:1})).to.be.undefined;
    });
  });
});
