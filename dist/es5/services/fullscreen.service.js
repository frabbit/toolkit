'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _rxjs = require('rxjs');

var _type = require('../utils/type');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// feature detection and wrapping
var enableFunction = '';
var disableFunction = '';
var elementProperty = '';
var changeEvent = '';

// detect browser or node env
var scope = (typeof document === 'undefined' ? 'undefined' : _typeof(document)) === 'object' ? document : null;

// only browser have a create document
if (scope) {
  var TEST_NODE = scope.createElement('div');

  if (TEST_NODE.requestFullscreen) {
    enableFunction = 'requestFullscreen';
    disableFunction = 'exitFullscreen';
    elementProperty = 'fullscreenElement';
    changeEvent = 'fullscreenchange';
  } else if (TEST_NODE.mozRequestFullScreen) {
    enableFunction = 'mozRequestFullScreen';
    disableFunction = 'mozCancelFullScreen';
    elementProperty = 'mozFullScreenElement';
    changeEvent = 'mozfullscreenchange';
  } else if (TEST_NODE.webkitRequestFullscreen) {
    enableFunction = 'webkitRequestFullscreen';
    disableFunction = 'webkitExitFullscreen';
    elementProperty = 'webkitFullscreenElement';
    changeEvent = 'webkitfullscreenchange';
  } else if (TEST_NODE.msRequestFullscreen) {
    enableFunction = 'msRequestFullscreen';
    disableFunction = 'msExitFullscreen';
    elementProperty = 'msFullscreenElement';
    changeEvent = 'MSFullscreenChange';
  }
}

/**
 * fullscreen service
 * wrapper service of fullscreen api
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 */

var FullscreenService = function () {
  /**
   * constructor
   *
   * @param logger
   */
  function FullscreenService(logger) {
    var _this = this;

    _classCallCheck(this, FullscreenService);

    this.logger = logger;
    this.supported = _type.type.function(scope[disableFunction]);
    this.enableType = enableFunction;
    this.onChange = new _rxjs.Subject();
    this.onExit = new _rxjs.Subject();

    if (this.supported) {
      (0, _rxjs.fromEvent)(scope, changeEvent).subscribe(function (event) {
        _this.onChange.next(event);

        if (!_this.isEnable) {
          _this.onExit.next(event);
        }
      });
    } else if (this.logger) {
      this.logger.warn('Fullscreen handling not supported');
    }
  }

  /**
   * return the current active fullscreen node
   *
   * @returns {*}
   */


  _createClass(FullscreenService, [{
    key: 'enableOnNode',


    /**
     * enable fullscreen on node
     *
     * @param node
     * @returns {boolean}
     */
    value: function enableOnNode(node) {
      if (this.supported) {
        try {
          node[enableFunction]();
          return true;
        } catch (error) {
          if (this.logger) {
            this.logger.error(error);
          }
        }
      }

      return false;
    }

    /**
     * close fullscreen
     *
     * @returns {boolean}
     */

  }, {
    key: 'disable',
    value: function disable() {
      if (this.supported) {
        scope[disableFunction]();
        return true;
      }

      return false;
    }
  }, {
    key: 'currentNode',
    get: function get() {
      return scope[elementProperty];
    }

    /**
     * is true if current fullscreen is active
     * @returns {boolean}
     */

  }, {
    key: 'isEnable',
    get: function get() {
      return this.currentNode !== null;
    }
  }]);

  return FullscreenService;
}();