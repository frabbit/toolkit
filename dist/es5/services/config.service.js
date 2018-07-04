'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * config service provider
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 */
var ConfigService = function () {
  function ConfigService() {
    _classCallCheck(this, ConfigService);
  }

  _createClass(ConfigService, [{
    key: 'load',

    /**
     * load configuration json script by node id
     *
     * @param name
     * @returns {Promise<any>}
     */
    value: function load(name) {
      return new Promise(function (resolve, reject) {
        var script = document.getElementById(name);

        if (!script) {
          reject('configuration not found');
        }

        var innerText = script.innerHTML;

        try {
          var json = JSON.parse(innerText);

          if (json) {
            resolve(json);
          } else {
            throw 'Configuration not valid';
          }
        } catch (error) {
          reject(error);
        }
      });
    }
  }]);

  return ConfigService;
}();