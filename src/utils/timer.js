/**
 * Timer helper to generate ticking events
 *
 * @example
 *  const timerDirect = new Timer(100, () => {
 *    console.log('called');
 *  }, true); // 100ms
 *
 *  const timerStopping = new Timer(100);
 *  timerStopping.onComplete = () => { ... }
 *  timerStopping.start();
 *
 *  timerStopping.isPlaying => true;
 *  timerStopping.stop();
 *  timerStopping.isPlaying => false;
 */
export class Timer {
  /**
   * constructor
   *
   * @param time
   */
  constructor(time, callback = () => {}, autostart = false) {
    this.enable = true;
    this.time = time;
    this.timer = null;
    this.onComplete = callback;
  }

  /**
   * get true if timer is active
   *
   * @returns {boolean}
   */
  get isPlaying() {
    return this.timer !== null;
  }

  /**
   * stop timer
   */
  stop() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    return this;
  }

  /**
   * start the timer
   *
   * @returns {Timer}
   */
  start() {
    if (this.isPlaying) {
      return this;
    }

    if (this.enable) {
      this.timer = setTimeout(this.onComplete, this.time);
    }

    return this;
  }
}
