import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/observable/fromEvent";

import { type } from "../utils/type";

// feature detection and wrapping
let enableFunction = '';
let disableFunction = '';
let elementProperty = '';
let changeEvent = '';

const TEST_NODE = document.createElement('div');

if (TEST_NODE.requestFullscreen) {
  enableFunction = 'requestFullscreen';
  disableFunction = 'exitFullscreen';
  elementProperty = 'fullscreenElement';
  changeEvent = 'fullscreenchange';

} else if (TEST_NODE.mozRequestFullScreen) {
  enableFunction = 'mozRequestFullScreen';
  disableFunction = 'mozCancelFullScreen';
  elementProperty = 'mozFullScreenElement';
  changeEvent = 'mozfullscreenchange';

} else if (TEST_NODE.webkitRequestFullscreen) {
  enableFunction = 'webkitRequestFullscreen';
  disableFunction = 'webkitExitFullscreen';
  elementProperty = 'webkitFullscreenElement';
  changeEvent = 'webkitfullscreenchange';

} else if (TEST_NODE.msRequestFullscreen) {
  enableFunction = 'msRequestFullscreen';
  disableFunction = 'msExitFullscreen';
  elementProperty = 'msFullscreenElement';
  changeEvent = 'MSFullscreenChange';

}

const SUPPORTED = type.function(document[disableFunction]);

/**
 * fullscreen service
 * wrapper service of fullscreen api
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 */
class FullscreenService {
  /**
   * constructor
   */
  constructor(logger) {
    this.supported = SUPPORTED;
    this.enableType = enableFunction;
    this.onChange = new Subject();
    this.onExit = new Subject();

    if (!this.supported) {
      Logger.warn('Fullscreen api not supported');

    } else {
      Observable
        .fromEvent(document, changeEvent)
        .subscribe(event => {
          this.onChange.next(event);

          if (!this.isEnable) {
            this.onExit.next(event);
          }
        });
    }
  }

  /**
   * return the current active fullscreen node
   *
   * @returns {*}
   */
  get currentNode() {
    return document[elementProperty];
  }

  /**
   * is true if current fullscreen is active
   * @returns {boolean}
   */
  get isEnable() {
    return this.currentNode !== null;
  }

  /**
   * enable fullscreen on node
   *
   * @param node
   * @returns {boolean}
   */
  enableOnNode(node) {
    if (this.supported) {
      try {
        node[enableFunction]();
        return true;

      } catch (error) {
        Logger.error(error);
      }
    }

    return false;
  }

  /**
   * close fullscreen
   *
   * @returns {boolean}
   */
  disable() {
    if (this.supported) {
      document[disableFunction]();
    }

    return false;
  }
}