"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.once = once;
/**
 * once calling function
 *
 * @param callback
 * @returns {Function}
 */
function once(callback) {
  var called = false;

  return function () {
    if (!called) {
      called = true;
      callback();
    }
  };
}