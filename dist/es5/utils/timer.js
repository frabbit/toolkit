"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Timer helper to generate ticking events
 *
 * @example
 *  const timerDirect = new Timer(100, () => {
 *    console.log('called');
 *  }, true); // 100ms
 *
 *  const timerStopping = new Timer(100);
 *  timerStopping.onComplete = () => { ... }
 *  timerStopping.start();
 *
 *  timerStopping.isPlaying => true;
 *  timerStopping.stop();
 *  timerStopping.isPlaying => false;
 */
var Timer = exports.Timer = function () {
  /**
   * constructor
   *
   * @param time
   */
  function Timer(time) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var autostart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, Timer);

    this.enable = true;
    this.time = time;
    this.timer = null;
    this.onComplete = callback;
  }

  /**
   * get true if timer is active
   *
   * @returns {boolean}
   */


  _createClass(Timer, [{
    key: "stop",


    /**
     * stop timer
     */
    value: function stop() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      return this;
    }

    /**
     * start the timer
     *
     * @returns {Timer}
     */

  }, {
    key: "start",
    value: function start() {
      if (this.isPlaying) {
        return this;
      }

      if (this.enable) {
        this.timer = setTimeout(this.onComplete, this.time);
      }

      return this;
    }
  }, {
    key: "isPlaying",
    get: function get() {
      return this.timer !== null;
    }
  }]);

  return Timer;
}();