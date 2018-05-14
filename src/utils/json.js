import { type } from './type';

/**
 * json utility
 *
 * @author Darius Sobczak
 */
export const json = {
  lastError: null,

  /**
   * @param value
   * @param defaults
   * @returns {*}
   */
  cast(value, defaults = null) {
    this.lastError = null;

    try {
      if (type.object(value) || type.array(value)) {
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
  isStringValid(value) {
    if (type.string(value)) {
      const firstChar = value.charAt(0);
      if (firstChar === '{' || firstChar === '[') {
        return true;
      }
    }

    return false;
  },
};
