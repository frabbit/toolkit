'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveNodeBySelector = resolveNodeBySelector;

var _type = require('./type');

/**
 * object select resolver
 *
 * @example
 *  const a = {b: 1};
 *  resolveNodeBySelector('a.b', a).then(b => 1)
 *
 * @param selector
 * @param root default is window
 * @returns {Promise}
 */
function resolveNodeBySelector(selector) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

  return new Promise(function (resolve, reject) {
    if (!_type.type.string(selector)) {
      reject('Selector not valid string');
    }

    if (!_type.type.object(root)) {
      reject('Root not valid object');
    }

    var route = String(selector).split('.');
    var node = root;

    try {
      var index = 0;
      var length = route.length;

      do {
        var key = route[index];
        node = node[key];
        index++;
      } while (index < length);
    } catch (error) {
      reject(error);
    }

    if (_type.type.valid(node)) {
      resolve(node);
    } else {
      reject('Not node found');
    }
  });
}