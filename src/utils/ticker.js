/**
 * ticker helper to generate ticking events
 * @param ticks
 * @param time
 */
export class Ticker {
  /**
   * constructor
   *
   * @param ticks
   * @param time
   */
  constructor(ticks, time) {
    this.ticks = ticks;
    this.time = time;
    this.currentTick = 0;
    this.timer = null;
    this.isPlaying = false;
    this.loop = true;
    this.onTick = () => {};
    this.onComplete = () => {};
  }

  /**
   * stop ticking
   */
  stop() {
    clearInterval(this.timer);
    this.timer = null;
    this.isPlaying = false;

    return this;
  }

  /**
   * @return Observable
   */
  start() {
    if (this.isPlaying) {
      this.stop();
    }

    this.isPlaying = true;

    this.timer = setInterval(() => {
      this.currentTick++;
      if (this.currentTick < this.ticks) {
        this.onTick(this.currentTick);
      } else {
        this.currentTick = 0;
        this.onComplete();

        if (this.loop && this.isPlaying) {
          this.start();
        } else {
          this.stop();
        }
      }
    }, this.time);

    return this;
  }

  /**
   * reset timer
   */
  reset() {
    const isPlaying = this.isPlaying;
    this.stop();
    this.currentTick = 0;

    if (isPlaying) {
      this.start();
    }
  }
}
