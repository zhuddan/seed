import { isDate, isDef, isObject, isUnDef } from '../helpers';
import { describe, expect, it } from 'vitest';
//
describe('is', () => {
  it('isDef', () => {
    expect(isDef(1)).toBe(true);
    expect(isDef()).toBe(false);
  });

  it('isUnDef', () => {
    expect(isUnDef()).toBe(true);
    expect(isUnDef(1)).toBe(false);
  });
  it('isObject', () => {
    expect(isObject({})).toBe(true);
    expect(isObject('')).toBe(false);
  });
  it('isDate', () => {
    expect(isDate(Function)).toBe(false);
    expect(isDate(new Date())).toBe(true);
  });
});