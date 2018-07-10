import { Observable, Subject, fromEvent } from 'rxjs';

import { type } from '../utils/type';

// feature detection and wrapping
let enableFunction = '';
let disableFunction = '';
let elementProperty = '';
let changeEvent = '';

// detect browser or node env
let scope = typeof document === 'object' ? document : null;

// only browser have a create document
if (scope) {
  const TEST_NODE = scope.createElement('div');

  if (TEST_NODE.requestFullscreen) {
    enableFunction = 'requestFullscreen';
    disableFunction = 'exitFullscreen';
    elementProperty = 'fullscreenElement';
    changeEvent = 'fullscreenchange';
  }
  else if (TEST_NODE.mozRequestFullScreen) {
    enableFunction = 'mozRequestFullScreen';
    disableFunction = 'mozCancelFullScreen';
    elementProperty = 'mozFullScreenElement';
    changeEvent = 'mozfullscreenchange';
  }
  else if (TEST_NODE.webkitRequestFullscreen) {
    enableFunction = 'webkitRequestFullscreen';
    disableFunction = 'webkitExitFullscreen';
    elementProperty = 'webkitFullscreenElement';
    changeEvent = 'webkitfullscreenchange';
  }
  else if (TEST_NODE.msRequestFullscreen) {
    enableFunction = 'msRequestFullscreen';
    disableFunction = 'msExitFullscreen';
    elementProperty = 'msFullscreenElement';
    changeEvent = 'MSFullscreenChange';
  }
}

/**
 * fullscreen service
 * wrapper service of fullscreen api
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 */
class FullscreenService {
  /**
   * constructor
   *
   * @param logger
   */
  constructor(logger) {
    this.logger = logger;
    this.supported = type.function(scope[disableFunction]);
    this.enableType = enableFunction;
    this.onChange = new Subject();
    this.onExit = new Subject();

    if (this.supported) {
      fromEvent(scope, changeEvent).subscribe(event => {
        this.onChange.next(event);

        if (!this.isEnable) {
          this.onExit.next(event);
        }
      });
    } else if (this.logger) {
      this.logger.warn('Fullscreen handling not supported');
    }
  }

  /**
   * return the current active fullscreen node
   *
   * @returns {*}
   */
  get currentNode() {
    return scope[elementProperty];
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
        if (this.logger) {
          this.logger.error(error);
        }
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
      scope[disableFunction]();
      return true;
    }

    return false;
  }
}
