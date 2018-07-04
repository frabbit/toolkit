"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ticker helper to generate ticking events
 * @param ticks
 * @param time
 */
var Ticker = exports.Ticker = function () {
  /**
   * constructor
   *
   * @param ticks
   * @param time
   */
  function Ticker(ticks, time) {
    _classCallCheck(this, Ticker);

    this.ticks = ticks;
    this.time = time;
    this.currentTick = 0;
    this.timer = null;
    this.isPlaying = false;
    this.loop = true;
    this.onTick = function () {};
    this.onComplete = function () {};
  }

  /**
   * stop ticking
   */


  _createClass(Ticker, [{
    key: "stop",
    value: function stop() {
      clearInterval(this.timer);
      this.timer = null;
      this.isPlaying = false;

      return this;
    }

    /**
     * @return Observable
     */

  }, {
    key: "start",
    value: function start() {
      var _this = this;

      if (this.isPlaying) {
        this.stop();
      }

      this.isPlaying = true;

      this.timer = setInterval(function () {
        _this.currentTick++;
        if (_this.currentTick < _this.ticks) {
          _this.onTick(_this.currentTick);
        } else {
          _this.currentTick = 0;
          _this.onComplete();

          if (_this.loop && _this.isPlaying) {
            _this.start();
          } else {
            _this.stop();
          }
        }
      }, this.time);

      return this;
    }

    /**
     * reset timer
     */

  }, {
    key: "reset",
    value: function reset() {
      var isPlaying = this.isPlaying;
      this.stop();
      this.currentTick = 0;

      if (isPlaying) {
        this.start();
      }
    }
  }]);

  return Ticker;
}();