/**
 * once calling function
 *
 * @param callback
 * @returns {Function}
 */
export function once(callback) {
  let called = false;

  return function() {
    if (!called) {
      called = true;
      callback();
    }
  };
}
