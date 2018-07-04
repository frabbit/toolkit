import { json } from './json';

test('can be a json detect', () => {
  expect(json.isStringValid('{}')).toBe(true);
  expect(json.isStringValid('[]')).toBe(true);
  expect(json.isStringValid('.')).toBe(false);
});

test('can cast string to json', () => {
  const json1 = '{"test": 1}';
  const json2 = '[{"name": "dananan", "age": 12}]';
  const jsonError = '[{name: "dananan"}]';

  expect(json.cast(json1)).toEqual({test: 1});
  expect(json.cast(json2)).toEqual([{name: 'dananan', age: 12}]);

  // return with default and has error
  expect(json.lastError).toBe(null);
  expect(json.cast(jsonError, 'no valid')).toBe('no valid');
  expect(json.lastError).not.toBe(null);
  expect(json.lastError.toString()).toMatch(/SyntaxError/);
});