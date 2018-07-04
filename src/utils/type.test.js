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
  });

  test('is array', () => {
    expect(type.array([])).toBe(true);
    expect(type.array('')).toBe(false);
    expect(type.array(null)).toBe(false);
  });

  test('is object', () => {
    expect(type.object({})).toBe(true);
    expect(type.object('')).toBe(false);
    expect(type.object(undefined)).toBe(false);
  });

  test('is number', () => {
    expect(type.number(1)).toBe(true);
    expect(type.number(454.2)).toBe(true);
    expect(type.number('232')).toBe(false);
    expect(type.number(NaN)).toBe(false);
  });

  test('is function', () => {
    expect(type.function(() => {})).toBe(true);
    expect(type.function(null)).toBe(false);
  })
});