import ViewportProvider from "./viewport.service";
import Logger from "./logger.service";
import { delay } from "../utils/delay";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/from";

let index = 0;

/**
 * bounds service
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 */
export class BoundsService {
  /**
   * constructor
   */
  constructor(minCoverage = 0.1) {
    index++;

    this.minCoverage = minCoverage;
    this.index = index;
    this.bounding = [];
    this.scrollSubscription = ViewportProvider
      .onScrollTop
      .subscribe(() => {
        // wait after 1ms, call deley for better performce
        delay(`BoundsService_${this.index}:scroll`, 1)
          .then(() => {
            // trigger all boundings
            Observable
              .from(this.bounding)
              .subscribe(bounding => {
                const nextBounding = this.getBounding(bounding.element);
                bounding.subject.next(nextBounding);
              });
          });
      });
  }

  /**
   * check how much an element is inside the view port
   * @param element
   * @return number between 0 (outside the viewport) and 1 (covering the viewport)
   */
  getScreenCoverage(element) {
    let coverage = 0;
    if (element && element.getBoundingClientRect) {
      const size = ViewportProvider.size;
      const rect = element.getBoundingClientRect();

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
  getBounding(element) {
    const coverage = this.getScreenCoverage(element);

    return {
      element,
      coverage,
      percentage: coverage * 100,
      inBounds: coverage > this.minCoverage,
      rect: element.getBoundingClientRect(),
    };
  }

  /**
   * @param element
   * @returns {BehaviorSubject}
   */
  onScreen(element) {
    const initBounding = this.getBounding(element);
    const subject = new BehaviorSubject(initBounding);

    if (element && element.getBoundingClientRect) {
      this.bounding.push({
        element,
        subject,
      });
    } else {
      Logger.warn('element not an bounds rectangle node');
    }

    return subject;
  }
}

export const BoundsProvider = new BoundsService();
export default BoundsProvider;