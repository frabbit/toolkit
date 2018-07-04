'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * type check utility
 *
 * @example
 *  type.valid(undefined) => false
 *  type.string('') => true
 *  type.string(12) => false
 */
var type = exports.type = {
  /**
   * check if the value is valid no null or undefined
   * @param value
   * @returns {boolean}
   */
  valid: function valid(value) {
    return value !== undefined && value !== null;
  },


  /**
   * check if it's a string and its empty
   *
   * @param value
   * @returns {boolean}
   */
  empty: function empty(value) {
    return this.valid(value) == false || String(value) === '';
  },


  /**
   * check if it's a string
   *
   * @param value
   * @returns {boolean}
   */
  string: function string(value) {
    return typeof value === 'string';
  },


  /**
   * check if it's a  boolean
   *
   * @param value
   * @returns {boolean}
   */
  boolean: function boolean(value) {
    return typeof value === 'boolean';
  },


  /**
   * check if it's a type of number
   *
   * @param value
   * @returns {boolean}
   */
  number: function number(value) {
    return typeof value === 'number' && isNaN(value) === false;
  },


  /**
   * check if it's a array
   *
   * @info use Array.isArray if your target environment support it
   * @param value
   * @returns {boolean}
   */
  array: function array(value) {
    return toString.call(value) === '[object Array]';
  },


  /**
   * check if it's a function
   *
   * @param value
   * @returns {boolean}
   */
  function: function _function(value) {
    return typeof value === 'function';
  },


  /**
   * check if it's a valid object
   *
   * @param value
   * @returns {boolean}
   */
  object: function object(value) {
    return value !== null && this.array(value) === false && value instanceof Object;
  },


  /**
   * check if is a html element
   *
   * @param value
   * @returns {*}
   */
  element: function element(value) {
    return this.object(value) && this.function(value.getBoundingClientRect);
  }
};