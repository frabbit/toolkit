import { type } from '../utils/type';
/**
 * storage service class
 */
export const TYPE_SESSION = 'session';
export const TYPE_LOCAL = 'local';

export class Storage {
  /**
   * @param storageType valid session type
   * @param prefix internal prefix predefine
   */
  constructor(storageType, prefix = '') {
    const scope = global || window;
    this.prefix = prefix;
    this.type = storageType;
    this.handlerName = `${storageType}Storage`;
    this.handler = scope[this.handlerName];
    this.supported = type.object(this.handler);

    if (!this.supported) {
      // add fallback for not supported version
      this.handler = {
        _store: {},
        setItem(name, value) {
          this._store[name] = value;
        },
        getItem(name) {
          return this._store.hasOwnProperty(name) ? this._store[name] : null;
        },
        removeItem(name) {
          delete this._store[name];
        },
      };
    }
  }

  /**
   * add storage data
   *
   * @param key
   * @param value
   * @returns {Storage}
   */
  set(key, value) {
    this.handler.setItem(`${this.prefix}${key}`, value);
    return this;
  }

  /**
   * has storage data
   *
   * @param key
   * @returns {boolean}
   */
  has(key) {
    return this.handler.getItem(`${this.prefix}${key}`) !== null;
  }

  /**
   * get storage entry
   * @param key
   * @param defaults
   * @returns {*}
   */
  get(key, defaults = null) {
    if (this.has(key)) {
      return this.handler.getItem(`${this.prefix}${key}`);
    }

    return defaults;
  }

  /**
   * remove storage entry
   *
   * @param key
   * @param value
   * @returns {Storage}
   */
  remove(key, value) {
    this.handler.removeItem(`${this.prefix}${key}`);
    return this;
  }
}
