import UAParser from 'ua-parser-js/dist/ua-parser.pack';

/**
 * detection service
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 * @dependecy ua-parser-js
 */
export class DetectionService {
  /**
   * constructor
   */
  constructor() {
    this.result = UAParser();
    this.node = document.createElement('div');
  }

  /**
   * get browser name
   *
   * @returns {*}
   */
  get browser() {
    return this.result.browser.name;
  }

  /**
   * get browser name
   *
   * @returns {*}
   */
  get device() {
    return this.result.device.type;
  }

  /**
   * check stylesheet support
   *
   * @param prop
   * @param value
   * @returns {boolean}
   */
  isStyleSupported(prop, value) {
    try {
      var style = this.node.style;
      // check if property exists
      if (!style.hasOwnProperty(prop)) {
        return false;
      }

      // check if property catch same result
      style[prop] = value;
      return style[prop] === value;
    } catch (e) {
      return false;
    }
  }
}
