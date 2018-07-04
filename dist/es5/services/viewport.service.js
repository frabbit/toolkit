'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewportService = exports.MEDIA_QUERY_TYPES_BOOTSTRAP = exports.MEDIA_QUERY_TYPES_FOUNDATION = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable = require('rxjs/Observable');

var _BehaviorSubject = require('rxjs/BehaviorSubject');

require('rxjs/add/observable/fromEvent');

require('rxjs/add/operator/filter');

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
  function ViewportService(mediaQueryTypes) {
    var _this = this;

    _classCallCheck(this, ViewportService);

    this.rootNode = window;
    this.bodyNode = document.body;

    // regist all vieport observer
    this.onResize = _Observable.Observable.fromEvent(window, 'resize');
    this.onVisiblityChange = _Observable.Observable.fromEvent(window, 'visibilitychange', function (event) {
      return !document.hidden;
    });

    // scrolling observer
    this.onScroll = _Observable.Observable.fromEvent(this.rootNode, 'scroll');
    this.onScrollTop = new _BehaviorSubject.BehaviorSubject(this.scrollTop);

    this.onScroll.subscribe(function (event) {
      _this.onScrollTop.next(_this.scrollTop);
    });

    // delete observer
    this.onDestory = _Observable.Observable.fromEvent(this.rootNode, 'beforeunload');

    // init scroll top value
    this.scrollTop = this.scrollTop;

    // init media query listeners
    this.initMediaMatcher(mediaQueryTypes);
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
        this.onMediaQuery = new _BehaviorSubject.BehaviorSubject(firstMediaQueryType);
      }

      this.mediaMatcher = {};

      this.mediaQueryTypes.forEach(function (name) {
        var metaNode = document.querySelector('meta[name="media:' + name + '"]');
        if (metaNode) {
          var style = getComputedStyle(metaNode);
          var mediaQueryString = String(style.fontFamily);
          mediaQueryString = mediaQueryString.substr(1, mediaQueryString.length - 2); // trim "
          var matcher = window.matchMedia(mediaQueryString);

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
      return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    /**
     * setter property scroll top, set the offset to top position
     *
     * @param {Number} value
     */
    ,
    set: function set(value) {
      if (document.documentElement) {
        document.documentElement.scrollTop = value;
      }

      this.bodyNode.scrollTop = value;
    }

    /**
     * get size of screen view
     *
     * @returns {{width: number, height: number}}
     */

  }, {
    key: 'size',
    get: function get() {
      return {
        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      };
    }
  }]);

  return ViewportService;
}();