import { ReplaySubject } from 'rxjs/ReplaySubject';
import { type } from '../utils/type';

const handler = window.history;
export const SUPPORTED = type.object(this.handler);

/**
 * History service
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 */
export class HistoryService {
  /**
   * constructor
   */
  constructor() {
    this.handler = handler;
    this.onChange = new ReplaySubject({});

    if (SUPPORTED) {
      window.onpopstate = event => {
        this.onChange.next(event.state);
      };

    } else  {
      throw new Error('feature not supported', 'history');
    }
  }

  /**
   * add new value to history
   * @param url
   * @param title
   * @param payload
   */
  push(url, title, payload = {}) {
    const state = Object.assign({ url, title }, payload);

    if (SUPPORTED) {
      this.handler.pushState(state, title, url);
    }

    this.onChange.next(state);
  }
}
