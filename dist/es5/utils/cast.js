'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cast = exports.ROUND_HALF = exports.ROUND_QUARTER = undefined;

var _type = require('./type');

var ROUND_QUARTER = exports.ROUND_QUARTER = 4;
var ROUND_HALF = exports.ROUND_HALF = 2;

/**
 * type casting
 */
var cast = exports.cast = {
  /**
   * cast boolean values
   *
   * @param value
   * @param defaults
   * @returns {boolean}
   */
  boolean: function boolean(value) {
    var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (_type.type.string(value)) {
      return value === 'true' || value === '1' ? true : false;
    }

    if (_type.type.number(value)) {
      return value > 0;
    }

    return defaults;
  },


  /**
   * cast to number
   *
   * @example
   *  number(1) => 1
   *  number('3s') => 3
   *  number('NaN') => null
   *  number('12,23') => 12.23
   *
   * @param value
   * @param defaults
   * @returns {*}
   */
  number: function number(value) {
    var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (_type.type.string(value)) {
      value = parseFloat(String(value).replace(',', '.'));
    }

    return _type.type.number(value) ? value : defaults;
  },


  /**
   * cast to number and round value
   *
   * @example
   *  roundNumber('52a', 2) => 52
   *  roundNumber('52,3', 2) => 52.5
   *  roundNumber('52,3', 4) => 52.25
   *  roundNumber('sdfsdfsdf', 4, 'wrong') => 'wrong'
   *
   * @param value
   * @param round
   * @param defaults
   * @returns {number}
   */
  roundNumber: function roundNumber(value, round) {
    var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (round > 0 === false) {
      round = ROUND_HALF;
    }

    value = cast.number(value);

    if (_type.type.number(value)) {
      return Math.round(value * round) / round;
    }

    return defaults;
  },


  /**
   * cast value to array
   *
   * @param value
   * @returns {Array}
   */
  array: function array(value) {
    if (_type.type.array(value)) {
      return value;
    }

    if (_type.type.valid(value)) {
      return [value];
    }

    return [];
  },


  /**
   * cast value to function
   *
   * @param value
   * @return {Function}
   */
  function: function _function(value) {
    if (!_type.type.function(value)) {
      return function () {};
    }
    return value;
  }
};