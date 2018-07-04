'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.json = undefined;

var _type = require('./type');

/**
 * json utility
 *
 * @author Darius Sobczak
 */
var json = exports.json = {
  lastError: null,

  /**
   * @param value
   * @param defaults
   * @returns {*}
   */
  cast: function cast(value) {
    var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    this.lastError = null;

    try {
      if (_type.type.object(value) || _type.type.array(value)) {
        return value;
      }

      if (this.isStringValid(value)) {
        return JSON.parse(value);
      }
    } catch (error) {
      this.lastError = error;
    }

    return defaults;
  },


  /**
   * simple check if string is an possible json string
   *
   * @param value
   * @returns {boolean}
   */
  isStringValid: function isStringValid(value) {
    if (_type.type.string(value)) {
      var firstChar = value.charAt(0);
      if (firstChar === '{' || firstChar === '[') {
        return true;
      }
    }

    return false;
  }
};