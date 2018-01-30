/**
 * Timer helper to generate ticking events
 *
 * @param time
 */
export class Timer {
  /**
   * constructor
   *
   * @param time
   */
  constructor(time)  {
    this.enable = true;
    this.time = time;
    this.timer = null;
    this.onComplete = () => {};
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
   * stop ticking
   */
  stop() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    return this;
  }

  /**
   * @return Observable
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