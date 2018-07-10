'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewportService = exports.MEDIA_QUERY_TYPES_BOOTSTRAP = exports.MEDIA_QUERY_TYPES_FOUNDATION = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rxjs = require('rxjs');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MEDIA_QUERY_TYPES_FOUNDATION = exports.MEDIA_QUERY_TYPES_FOUNDATION = ['small', 'medium', 'large', 'xlarge', 'xxlarge'];
var MEDIA_QUERY_TYPES_BOOTSTRAP = exports.MEDIA_QUERY_TYPES_BOOTSTRAP = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

/**
 * viewport service
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 */

var ViewportService = exports.ViewportService = function () {
  /**
   * constructor
   */
  function ViewportService() {
    var _this = this;

    var mediaQueryTypes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : MEDIA_QUERY_TYPES_FOUNDATION;

    _classCallCheck(this, ViewportService);

    this.scope = global || window;
    this.isBrowser = (typeof document === 'undefined' ? 'undefined' : _typeof(document)) === 'object';
    this.document = this.isBrowser ? document : null;
    this.rootNode = this.scope;
    this.bodyNode = this.isBrowser ? document.body : null;

    if (this.isBrowser) {
      // regist all vieport observer
      this.onResize = (0, _rxjs.fromEvent)(this.scope, 'resize');
      this.onVisiblityChange = (0, _rxjs.fromEvent)(this.scope, 'visibilitychange', function (event) {
        return !_this.document.hidden;
      });

      // scrolling observer
      this.onScroll = (0, _rxjs.fromEvent)(this.rootNode, 'scroll');
      this.onScrollTop = new _rxjs.BehaviorSubject(this.scrollTop);

      this.onScroll.subscribe(function (event) {
        _this.onScrollTop.next(_this.scrollTop);
      });

      // delete observer
      this.onDestory = (0, _rxjs.fromEvent)(this.rootNode, 'beforeunload');

      // init scroll top value
      this.scrollTop = this.scrollTop;

      // init media query listeners
      this.initMediaMatcher(mediaQueryTypes);
    } else {
      var subjects = ['onResize', 'onVisiblityChange', 'onScroll', 'onScrollTop', 'onDestory', 'onMediaQuery'];
      subjects.forEach(function (name) {
        _this[name] = new _rxjs.Subject();
      });
    }
  }

  /**
   * init
   */


  _createClass(ViewportService, [{
    key: 'initMediaMatcher',
    value: function initMediaMatcher(mediaQueryTypes) {
      var _this2 = this;

      this.mediaQueryTypes = mediaQueryTypes;
      var firstMediaQueryType = this.mediaQueryTypes[0];

      // clean old media matcher set
      if (this.mediaMatcher) {
        Object.keys(this.mediaMatcher).forEach(function (matcher) {
          return matcher.removeListener();
        });

        this.onMediaQuery.next(firstMediaQueryType);
      } else {
        this.onMediaQuery = new _rxjs.BehaviorSubject(firstMediaQueryType);
      }

      this.mediaMatcher = {};

      this.mediaQueryTypes.forEach(function (name) {
        var metaNode = document.querySelector('meta[name="media:' + name + '"]');
        if (metaNode) {
          var style = getComputedStyle(metaNode);
          var mediaQueryString = String(style.fontFamily);
          mediaQueryString = mediaQueryString.substr(1, mediaQueryString.length - 2); // trim "
          var matcher = _this2.scope.matchMedia(mediaQueryString);

          if (matcher.matches) {
            // predefine right value
            _this2.onMediaQuery.next(name);
          }

          // save matcher
          _this2.mediaMatcher[name] = matcher;
          matcher.addListener(function (mq) {
            // resolve the name if this is the current breakpoint
            if (mq.matches) {
              _this2.onMediaQuery.next(name);
            }
          });
        }
      });
    }

    /**
     * getter property scroll top, offset to screen top position
     *
     * @returns {Number}
     */

  }, {
    key: 'scrollTop',
    get: function get() {
      if (this.isBrowser) {
        return this.scope.pageYOffset || document.documentElement.scrollTop || this.bodyNode.scrollTop || 0;
      }
      return 0;
    }

    /**
     * setter property scroll top, set the offset to top position
     *
     * @param {Number} value
     */
    ,
    set: function set(value) {
      if (this.isBrowser) {
        if (document.documentElement) {
          document.documentElement.scrollTop = value;
        }

        this.bodyNode.scrollTop = value;
      }
    }

    /**
     * get size of screen view
     *
     * @returns {{width: number, height: number}}
     */

  }, {
    key: 'size',
    get: function get() {
      if (this.isBrowser) {
        return {
          width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
          height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        };
      }
      return { width: 0, height: 0 };
    }
  }]);

  return ViewportService;
}();