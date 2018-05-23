import { once } from './once';

test('test single callable', () => {
  const callback = jest.fn();
  const onceCallback = once(callback);
  expect(callback.mock.calls.length).toBe(0);

  // test single callable
  onceCallback();
  onceCallback();
  expect(callback.mock.calls.length).toBe(1);
});