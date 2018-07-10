import { Observable, fromEvent } from 'rxjs';

/**
 * loader service provider
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 * @info only dom support
 */
export class LoaderService {
  /**
   * constructor
   */
  constructor() {
    this.loaders = {};
    this.isBrowser = typeof document === 'object';
    this.root = this.isBrowser ? document.body : null;
  }

  /**
   * load style sheet file
   *
   * @param file
   * @returns {Promise}
   */
  loadStylesheet(file) {
    return new Promise((resolve, reject) => {
      if (this.root) {

        if (this.loaders[file]) {
          return resolve(this.loaders[name]);
        }

        const tag = document.createElement('link');
        tag.rel = `stylesheet`;
        tag.href = file;
        const subscription = fromEvent(tag, 'load');

        this.loaders[file] = {
          tag,
          subscription,
        };

        this.root.appendChild(tag);

        subscription.subscribe(() => resolve(this.loaders[name]), reject);
      }
    });
  }

  /**
   * load script file
   *
   * @param file
   * @returns {Promise}
   */
  loadScript(file) {
    return new Promise((resolve, reject) => {
      if (this.root) {
        if (this.loaders[file]) {
          return resolve(this.loaders[name]);
        }

        const tag = document.createElement('script');
        tag.src = file;
        tag.async = true;
        const subscription = Observable.fromEvent(tag, 'load');

        this.loaders[file] = {
          tag,
          subscription,
        };

        this.root.appendChild(tag);

        subscription.subscribe(() => resolve(this.loaders[name]), reject);
      }
    });
  }
}
