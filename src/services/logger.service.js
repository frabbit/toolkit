/**
 * logger service
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 */
function noop(...args) {}

export const LEVEL_NONE = 0;
export const LEVEL_ERROR = 1;
export const LEVEL_WARN = 2;
export const LEVEL_INFO = 3;
export const LEVEL_LOG = 4;
export const LEVEL_DEBUG = 5;

const methods = ['error', 'warn', 'info', 'log', 'debug', 'group', 'groupEnd', 'time', 'timeEnd'];

/**
 * Logger service class
 */
export class LoggerService {
  /**
   * @param logLevel
   */
  constructor(logLevel) {
    const scope = global || window;
    this.supported = scope['console'] === 'object';
    this.supportedMethod = {};

    methods.forEach(method => {
      const isSupported = this.supported && typeof console[method] === 'function';
      this.supportedMethod[method] = isSupported;
    });
    // non log-level dependent methods
    this.group = this.supportedMethod.group ? console.group.bind(console) : noop;
    this.groupEnd = this.supportedMethod.groupEnd ? console.groupEnd.bind(console) : noop;
    this.time = this.supportedMethod.time ? console.time.bind(console) : noop;
    this.timeEnd = this.supportedMethod.timeEnd ? console.timeEnd.bind(console) : noop;
    // set error level
    this.setLevel(logLevel);
  }

  /**
   * @param logLevel
   * @returns {LoggerService}
   */
  setLevel(logLevel) {
    if (this.supported) {
      this.info('Logger level', logLevel);
    }

    this.logLevel = logLevel;

    // init all internal log function
    this.error =
      this.supportedMethod.error && this.logLevel >= LEVEL_ERROR
        ? console.error.bind(console)
        : noop;
    this.warn =
      this.supportedMethod.warn && this.logLevel >= LEVEL_WARN ? console.warn.bind(console) : noop;
    this.info =
      this.supportedMethod.info && this.logLevel >= LEVEL_INFO ? console.info.bind(console) : noop;
    this.log =
      this.supportedMethod.log && this.logLevel >= LEVEL_LOG ? console.log.bind(console) : noop;
    this.debug =
      this.supportedMethod.debug && this.logLevel >= LEVEL_DEBUG
        ? console.debug.bind(console)
        : noop;
    return this;
  }
}
