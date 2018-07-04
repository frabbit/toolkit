"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wait = wait;
/**
 * wait x ms to call function
 * @param time
 */
function wait(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}