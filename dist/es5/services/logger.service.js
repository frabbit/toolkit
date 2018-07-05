'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * logger service
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 */
function noop() {}

var LEVEL_NONE = exports.LEVEL_NONE = 0;
var LEVEL_ERROR = exports.LEVEL_ERROR = 1;
var LEVEL_WARN = exports.LEVEL_WARN = 2;
var LEVEL_INFO = exports.LEVEL_INFO = 3;
var LEVEL_LOG = exports.LEVEL_LOG = 4;
var LEVEL_DEBUG = exports.LEVEL_DEBUG = 5;

var methods = ['error', 'warn', 'info', 'log', 'debug', 'group', 'groupEnd', 'time', 'timeEnd'];

/**
 * Logger service class
 */

var LoggerService = exports.LoggerService = function () {
  /**
   * @param logLevel
   */
  function LoggerService(logLevel) {
    var _this = this;

    _classCallCheck(this, LoggerService);

    var scope = global || window;
    this.supported = scope['console'] === 'object';
    this.supportedMethod = {};

    methods.forEach(function (method) {
      var isSupported = _this.supported && typeof console[method] === 'function';
      _this.supportedMethod[method] = isSupported;
    });
    // non log-level dependent methods
    this.group = this.supportedMethod.group ? console.group.bind(console) : noop;
    this.groupEnd = this.supportedMethod.groupEnd ? console.groupEnd.bind(console) : noop;
    this.time = this.supportedMethod.time ? console.time.bind(console) : noop;
    this.timeEnd = this.supportedMethod.timeEnd ? console.timeEnd.bind(console) : noop;
    // set error level
    this.setLevel(logLevel);
  }

  /**
   * @param logLevel
   * @returns {LoggerService}
   */


  _createClass(LoggerService, [{
    key: 'setLevel',
    value: function setLevel(logLevel) {
      if (this.supported) {
        this.info('Logger level', logLevel);
      }

      this.logLevel = logLevel;

      // init all internal log function
      this.error = this.supportedMethod.error && this.logLevel >= LEVEL_ERROR ? console.error.bind(console) : noop;
      this.warn = this.supportedMethod.warn && this.logLevel >= LEVEL_WARN ? console.warn.bind(console) : noop;
      this.info = this.supportedMethod.info && this.logLevel >= LEVEL_INFO ? console.info.bind(console) : noop;
      this.log = this.supportedMethod.log && this.logLevel >= LEVEL_LOG ? console.log.bind(console) : noop;
      this.debug = this.supportedMethod.debug && this.logLevel >= LEVEL_DEBUG ? console.debug.bind(console) : noop;
      return this;
    }
  }]);

  return LoggerService;
}();