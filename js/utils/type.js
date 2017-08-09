/**
 * type check
 */

export const type = {
  valid(value) {
    return (value !== undefined && value !== null);
  },

  empty(value) {
    return this.valid(value) == false || String(value) === '';
  },

  string(value) {
    return typeof value === 'string';
  },

  boolean(value) {
    return value === true || value === false;
  },

  number(value) {
    return typeof value === 'number' && isNaN(value) === false;
  },

  array(value) {
    return Array.isArray(value);
  },

  function(value) {
    return typeof value === 'function';
  },

  object(value) {
    return value !== null && this.array(value) === false && value instanceof Object;
  },

  element(value) {
    return this.object(value) && this.function(value.getBoundingClientRect);
  }
};
