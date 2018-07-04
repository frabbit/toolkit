'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HistoryService = exports.SUPPORTED = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ReplaySubject = require('rxjs/ReplaySubject');

var _type = require('../utils/type');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var handler = window.history;
var SUPPORTED = exports.SUPPORTED = _type.type.object(undefined.handler);

/**
 * History service
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 */

var HistoryService = exports.HistoryService = function () {
  /**
   * constructor
   */
  function HistoryService() {
    var _this = this;

    _classCallCheck(this, HistoryService);

    this.handler = handler;
    this.onChange = new _ReplaySubject.ReplaySubject({});

    if (SUPPORTED) {
      window.onpopstate = function (event) {
        _this.onChange.next(event.state);
      };
    } else {
      throw new Error('feature not supported', 'history');
    }
  }

  /**
   * add new value to history
   * @param url
   * @param title
   * @param payload
   */


  _createClass(HistoryService, [{
    key: 'push',
    value: function push(url, title) {
      var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var state = Object.assign({ url: url, title: title }, payload);

      if (SUPPORTED) {
        this.handler.pushState(state, title, url);
      }

      this.onChange.next(state);
    }
  }]);

  return HistoryService;
}();