import { type } from './type';

export const ROUND_QUARTER = 4;
export const ROUND_HALF = 2;

/**
 * type casting
 */
export const cast = {
  /**
   * cast boolean values
   *
   * @param value
   * @param defaults
   * @returns {boolean}
   */
  boolean(value, defaults = false) {
    if (type.string(value)) {
      return value === 'true' || value === '1' ? true : false;
    }

    if (type.number(value)) {
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
  number(value, defaults = null) {
    if (type.string(value)) {
      value = parseFloat(String(value).replace(',', '.'));
    }

    return type.number(value) ? value : defaults;
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
  roundNumber(value, round, defaults = null) {
    if (round > 0 === false) {
      round = ROUND_HALF;
    }

    value = cast.number(value);

    if (type.number(value)) {
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
  array(value) {
    if (type.array(value)) {
      return value;
    }

    if (type.valid(value)) {
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
  function(value) {
    if (!type.function(value)) {
      return () => {};
    }
    return value;
  },
};
