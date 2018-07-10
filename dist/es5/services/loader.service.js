'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoaderService = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rxjs = require('rxjs');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * loader service provider
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 * @info only dom support
 */
var LoaderService = exports.LoaderService = function () {
  /**
   * constructor
   */
  function LoaderService() {
    _classCallCheck(this, LoaderService);

    this.loaders = {};
    this.isBrowser = (typeof document === 'undefined' ? 'undefined' : _typeof(document)) === 'object';
    this.root = this.isBrowser ? document.body : null;
  }

  /**
   * load style sheet file
   *
   * @param file
   * @returns {Promise}
   */


  _createClass(LoaderService, [{
    key: 'loadStylesheet',
    value: function loadStylesheet(file) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (_this.root) {

          if (_this.loaders[file]) {
            return resolve(_this.loaders[name]);
          }

          var tag = document.createElement('link');
          tag.rel = 'stylesheet';
          tag.href = file;
          var subscription = (0, _rxjs.fromEvent)(tag, 'load');

          _this.loaders[file] = {
            tag: tag,
            subscription: subscription
          };

          _this.root.appendChild(tag);

          subscription.subscribe(function () {
            return resolve(_this.loaders[name]);
          }, reject);
        }
      });
    }

    /**
     * load script file
     *
     * @param file
     * @returns {Promise}
     */

  }, {
    key: 'loadScript',
    value: function loadScript(file) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (_this2.root) {
          if (_this2.loaders[file]) {
            return resolve(_this2.loaders[name]);
          }

          var tag = document.createElement('script');
          tag.src = file;
          tag.async = true;
          var subscription = _rxjs.Observable.fromEvent(tag, 'load');

          _this2.loaders[file] = {
            tag: tag,
            subscription: subscription
          };

          _this2.root.appendChild(tag);

          subscription.subscribe(function () {
            return resolve(_this2.loaders[name]);
          }, reject);
        }
      });
    }
  }]);

  return LoaderService;
}();