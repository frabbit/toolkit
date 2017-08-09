import UAParser from "ua-parser-js/dist/ua-parser.pack";

/**
 * detection service
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
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

  isStyleSupported(prop, value) {
    try {
      var style = this.node.style;
      if (!(prop in style)) return false;
      style[prop] = value;
      return (style[prop] === value);
    }
    catch (e) {
      return false;
    }
  }
}

export const DetectionProvider = new DetectionService();
export default DetectionProvider;