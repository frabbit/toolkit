'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Storage = exports.SUPPORTED = exports.TYPE_LOCAL = exports.TYPE_SESSION = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _type = require('../utils/type');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * storage service class
 */
var TYPE_SESSION = exports.TYPE_SESSION = 'session';
var TYPE_LOCAL = exports.TYPE_LOCAL = 'local';

var SUPPORTED = exports.SUPPORTED = _type.type.object(window[TYPE_SESSION]);

var Storage = exports.Storage = function () {
  /**
   * @param storageType valid session type
   * @param prefix internal prefix predefine
   */
  function Storage(storageType) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    _classCallCheck(this, Storage);

    this.prefix = prefix;
    this.type = storageType;
    this.handlerName = storageType + 'Storage';
    this.handler = window[this.handlerName];

    if (!_type.type.object(this.handler)) {
      throw new Error('Not supported storage type', storageType);
    }
  }

  /**
   * add storage data
   *
   * @param key
   * @param value
   * @returns {Storage}
   */


  _createClass(Storage, [{
    key: 'set',
    value: function set(key, value) {
      this.handler.setItem('' + this.prefix + key, value);
      return this;
    }

    /**
     * has storage data
     *
     * @param key
     * @returns {boolean}
     */

  }, {
    key: 'has',
    value: function has(key) {
      return this.handler.getItem('' + this.prefix + key) !== null;
    }

    /**
     * get storage entry
     * @param key
     * @param defaults
     * @returns {*}
     */

  }, {
    key: 'get',
    value: function get(key) {
      var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (this.has(key)) {
        return this.handler.getItem('' + this.prefix + key);
      }

      return defaults;
    }

    /**
     * remove storage entry
     *
     * @param key
     * @param value
     * @returns {Storage}
     */

  }, {
    key: 'remove',
    value: function remove(key, value) {
      this.handler.removeItem('' + this.prefix + key);
      return this;
    }
  }]);

  return Storage;
}();