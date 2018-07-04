"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tick = tick;

var _wait = require("./wait");

/**
 * call next tick
 *
 * @returns {Promise<null>}
 */
function tick() {
  return (0, _wait.wait)(0);
}