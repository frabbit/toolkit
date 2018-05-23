/**
 * wait x ms to call function
 * @param time
 */
export function wait(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}