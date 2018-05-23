import { type } from "./type";

const timers = {};

/***
 * delay callback
 * @param id
 * @param time
 * @returns {Promise|Promise<null>}
 */
export function delay(id, time) {
  if (type.string(id) === false) {
    throw new Error('delay id should be an string');
  }

  if (time < 0) {
    throw new Error('delay time should be an number');
  }

  if (timers[id]) {
    timers[id] = clearTimeout(timers[id]);
  }

  return new Promise(resolve => {
    timers[id] = setTimeout(resolve, time);
  });
}