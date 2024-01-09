import { describe, expect, test } from 'vitest';
//
describe('getNumericValue', () => {
  test('100 => 100px', () => {
    expect(getNumericValue('100')).toBe('100px');
  });
  test('200 => 200px', () => {
    expect(getNumericValue(200)).toBe('200px');
  });
  test('maybe a value => maybe a value', () => {
    expect(getNumericValue('maybe a value')).toBe('maybe a value');
  });
});