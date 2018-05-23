import { tick } from './tick';

test('test tick', async () => {
  expect.assertions(1);
  return expect(tick()).resolves.toBe(undefined);
});