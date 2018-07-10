'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoundsService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _delay = require('../utils/delay');

var _rxjs = require('rxjs');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var index = 0;

/**
 * bounds service
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 */

var BoundsService = exports.BoundsService = function () {
  /**
   *
   * @param {ViewportService} viewport
   * @param minCoverage
   */
  function BoundsService(viewport) {
    var _this = this;

    var minCoverage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.1;

    _classCallCheck(this, BoundsService);

    index++;

    this.viewport = viewport;
    this.minCoverage = minCoverage;
    this.index = index;
    this.bounding = [];

    this.detectBounding = function () {
      // trigger all boundings
      (0, _rxjs.from)(_this.bounding).subscribe(function (bounding) {
        var nextBounding = _this.getBounding(bounding.element);
        bounding.subject.next(nextBounding);
      });
    };
    this.lazyDetectBouding = function () {
      // wait after 1ms, call deley for better performce
      (0, _delay.delay)('BoundsService_' + _this.index + ':scroll', 1).then(_this.detectBounding);
    };

    this.scrollSubscription = viewport.onScrollTop.subscribe(this.lazyDetectBouding);
    this.resizeSubscription = viewport.onResize.subscribe(this.lazyDetectBouding);
  }

  /**
   * check how much an element is inside the view port
   * @param element
   * @return number between 0 (outside the viewport) and 1 (covering the viewport)
   */


  _createClass(BoundsService, [{
    key: 'getScreenCoverage',
    value: function getScreenCoverage(element) {
      var coverage = 0;
      if (element && element.getBoundingClientRect) {
        var size = this.viewport.size;
        var rect = element.getBoundingClientRect();

        // is top line in screen
        if (rect.top - size.height < 0) {
          if (rect.top < 0) {
            coverage = rect.bottom / rect.height;
          } else {
            coverage = (rect.height - (rect.bottom - size.height)) / rect.height;
          }

          // outside the bottom position
          if (rect.bottom < 0) {
            coverage = 0;
          }
        }

        return coverage;
      }

      return coverage;
    }

    /**
     * get bound details
     *
     * @param element
     * @returns {{element: *, getScreenCoverage: number, inBounds: boolean}}
     */

  }, {
    key: 'getBounding',
    value: function getBounding(element) {
      var coverage = this.getScreenCoverage(element);

      return {
        element: element,
        coverage: coverage,
        percentage: coverage * 100,
        inBounds: coverage > this.minCoverage,
        rect: element.getBoundingClientRect()
      };
    }

    /**
     * @param element
     * @returns {BehaviorSubject<{element: *, getScreenCoverage: number, inBounds: boolean}>}
     */

  }, {
    key: 'onScreen',
    value: function onScreen(element) {
      var initBounding = this.getBounding(element);
      var subject = new _rxjs.BehaviorSubject(initBounding);

      if (element && element.getBoundingClientRect) {
        this.bounding.push({
          element: element,
          subject: subject
        });
      } else {
        throw 'element not an bounds rectangle node';
      }

      return subject;
    }
  }]);

  return BoundsService;
}();