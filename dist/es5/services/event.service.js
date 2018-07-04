'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ReplaySubject = require('rxjs/ReplaySubject');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Event service class
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 */
var EventService = exports.EventService = function () {
  /**
   * constructor
   *
   * @param logger
   */
  function EventService() {
    var replay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;

    _classCallCheck(this, EventService);

    this.subject = new _ReplaySubject.ReplaySubject(replay);
  }

  /**
   * @param name
   * @param payload
   */


  _createClass(EventService, [{
    key: 'trigger',
    value: function trigger(name) {
      var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var event = {
        name: name,
        payload: payload
      };

      this.subject.next(event);
    }

    /**
     * @param name
     * @returns {Observable<IEvent>}
     */

  }, {
    key: 'on',
    value: function on(name) {
      return this.subject.filter(function (e) {
        return e.name === name;
      });
    }
  }]);

  return EventService;
}();