import { ReplaySubject } from 'rxjs/ReplaySubject';

/**
 * Event service class
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 */
export class EventService {
  /**
   * constructor
   *
   * @param logger
   */
  constructor(replay = 20) {
    this.subject = new ReplaySubject(replay);
  }

  /**
   * @param name
   * @param payload
   */
  trigger(name, payload = {}) {
    const event = {
      name,
      payload,
    };

    this.subject.next(event);
  }

  /**
   * @param name
   * @returns {Observable<IEvent>}
   */
  on(name) {
    return this.subject.filter(e => e.name === name);
  }
}
