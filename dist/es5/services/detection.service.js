"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetectionService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uaParser = require("ua-parser-js/dist/ua-parser.pack");

var _uaParser2 = _interopRequireDefault(_uaParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * detection service
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 * @dependecy ua-parser-js
 */
var DetectionService = exports.DetectionService = function () {
  /**
   * constructor
   */
  function DetectionService() {
    _classCallCheck(this, DetectionService);

    this.result = (0, _uaParser2.default)();
    this.node = document.createElement('div');
  }

  /**
   * get browser name
   *
   * @returns {*}
   */


  _createClass(DetectionService, [{
    key: "isStyleSupported",


    /**
     * check stylesheet support
     *
     * @param prop
     * @param value
     * @returns {boolean}
     */
    value: function isStyleSupported(prop, value) {
      try {
        var style = this.node.style;
        // check if property exists
        if (!style.hasOwnProperty(prop)) {
          return false;
        }

        // check if property catch same result
        style[prop] = value;
        return style[prop] === value;
      } catch (e) {
        return false;
      }
    }
  }, {
    key: "browser",
    get: function get() {
      return this.result.browser.name;
    }

    /**
     * get browser name
     *
     * @returns {*}
     */

  }, {
    key: "device",
    get: function get() {
      return this.result.device.type;
    }
  }]);

  return DetectionService;
}();