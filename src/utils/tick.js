import { wait } from "./wait";

/**
 * call next tick
 *
 * @returns {Promise<null>}
 */
export function tick() {
  return wait(0);
}
