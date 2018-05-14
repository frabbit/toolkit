import { type } from './type';

describe('type checks', () => {
  test('is string', () => {
    expect(type.boolean(true)).toBe(true);
    expect(type.boolean(false)).toBe(true);
    expect(type.boolean('')).toBe(false);
    expect(type.boolean('test')).toBe(false);
  });

  test('is valid', () => {
    expect(type.valid(true)).toBe(true);
    expect(type.valid('')).toBe(true);
    expect(type.valid(0)).toBe(true);
    expect(type.valid(1)).toBe(true);
    expect(type.valid(undefined)).toBe(false);
    expect(type.valid(null)).toBe(false);
  })
});