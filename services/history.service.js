import { ReplaySubject } from 'rxjs/ReplaySubject';
import { type } from '../utils/type';
import { Logger } from './logger.service';

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
    this.handler = window.history;
    this.isSupported = type.object(this.handler);
    this.onChange = new ReplaySubject({});

    if (this.isSupported) {
      window.onpopstate = event => {
        this.onChange.next(event.state);
      };

    } else {
      Logger.warn('feature not supported', 'history');
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

    if (this.isSupported) {
      this.handler.pushState(state, title, url);
    }

    this.onChange.next(state);
  }
}

export const HistoryProvider = new HistoryService();
export default HistoryProvider;
