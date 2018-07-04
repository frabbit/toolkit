'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delay = delay;

var _type = require('./type');

var timers = {};

/***
 * delay callback
 * @param id
 * @param time
 * @returns {Promise|Promise<null>}
 */
function delay(id, time) {
  if (_type.type.string(id) === false) {
    throw new Error('delay id should be an string');
  }

  if (time < 0) {
    throw new Error('delay time should be an number');
  }

  if (timers[id]) {
    timers[id] = clearTimeout(timers[id]);
  }

  return new Promise(function (resolve) {
    timers[id] = setTimeout(resolve, time);
  });
}