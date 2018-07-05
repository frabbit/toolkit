'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Storage = exports.TYPE_LOCAL = exports.TYPE_SESSION = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _type = require('../utils/type');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * storage service class
 */
var TYPE_SESSION = exports.TYPE_SESSION = 'session';
var TYPE_LOCAL = exports.TYPE_LOCAL = 'local';

var Storage = exports.Storage = function () {
  /**
   * @param storageType valid session type
   * @param prefix internal prefix predefine
   */
  function Storage(storageType) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    _classCallCheck(this, Storage);

    var scope = global || window;
    this.prefix = prefix;
    this.type = storageType;
    this.handlerName = storageType + 'Storage';
    this.handler = scope[this.handlerName];
    this.supported = _type.type.object(this.handler);

    if (!this.supported) {
      // add fallback for not supported version
      this.handler = {
        _store: {},
        setItem: function setItem(name, value) {
          this._store[name] = value;
        },
        getItem: function getItem(name) {
          return this._store.hasOwnProperty(name) ? this._store[name] : null;
        },
        removeItem: function removeItem(name) {
          delete this._store[name];
        }
      };
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