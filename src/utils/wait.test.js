import { wait } from './wait';

test('test wait', async () => {
  expect.assertions(1);
  return expect(wait(10)).resolves.toBe(undefined);
});