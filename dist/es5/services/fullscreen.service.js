"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable = require("rxjs/Observable");

var _Subject = require("rxjs/Subject");

require("rxjs/add/observable/fromEvent");

var _type = require("../utils/type");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// feature detection and wrapping
var enableFunction = '';
var disableFunction = '';
var elementProperty = '';
var changeEvent = '';

var TEST_NODE = document.createElement('div');

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

var SUPPORTED = _type.type.function(document[disableFunction]);

/**
 * fullscreen service
 * wrapper service of fullscreen api
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 */

var FullscreenService = function () {
  /**
   * constructor
   */
  function FullscreenService(logger) {
    var _this = this;

    _classCallCheck(this, FullscreenService);

    this.supported = SUPPORTED;
    this.enableType = enableFunction;
    this.onChange = new _Subject.Subject();
    this.onExit = new _Subject.Subject();

    if (!this.supported) {
      Logger.warn('Fullscreen api not supported');
    } else {
      _Observable.Observable.fromEvent(document, changeEvent).subscribe(function (event) {
        _this.onChange.next(event);

        if (!_this.isEnable) {
          _this.onExit.next(event);
        }
      });
    }
  }

  /**
   * return the current active fullscreen node
   *
   * @returns {*}
   */


  _createClass(FullscreenService, [{
    key: "enableOnNode",


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
          Logger.error(error);
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
    key: "disable",
    value: function disable() {
      if (this.supported) {
        document[disableFunction]();
      }

      return false;
    }
  }, {
    key: "currentNode",
    get: function get() {
      return document[elementProperty];
    }

    /**
     * is true if current fullscreen is active
     * @returns {boolean}
     */

  }, {
    key: "isEnable",
    get: function get() {
      return this.currentNode !== null;
    }
  }]);

  return FullscreenService;
}();