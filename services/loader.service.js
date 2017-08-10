import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";

/**
 * loader service provider
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 */
export class LoaderService {
  constructor() {
    this.loaders = {};
    this.root = document.body;
  }

  /**
   * load style sheet file
   *
   * @param file
   * @returns {Promise}
   */
  loadStylesheet(file) {
    return new Promise((resolve, reject) => {
      if (this.loaders[file]) {
        return resolve(this.loaders[name]);
      }

      const tag = document.createElement('link');
      tag.rel = `stylesheet`;
      tag.href = file;
      const subscription = Observable.fromEvent(tag, 'load');

      this.loaders[file] = {
        tag,
        subscription,
      };

      this.root.appendChild(tag);

      subscription.subscribe(
        () => resolve(this.loaders[name]),
        reject
      );
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

      subscription.subscribe(
        () => resolve(this.loaders[name]),
        reject
      );
    });
  }
}

export const LoaderProvider = new LoaderService();
export default LoaderProvider;