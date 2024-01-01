import { isArray, isDate, isDef, isNull, isNullOrUnDef, isNumber, isObject, isRegExp, isString, isUnDef, isWindow } from '../helpers';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';

const { window } = new JSDOM();
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

  it('isNull', () => {
    expect(isNull('null')).toBe(false);
    expect(isNull(null)).toBe(true);
  });

  it('isNullOrUnDef', () => {
    expect(isNullOrUnDef('null')).toBe(false);
    expect(isNullOrUnDef(null)).toBe(true);
    expect(isNullOrUnDef(undefined)).toBe(true);
  });

  it('isNumber', () => {
    expect(isNumber('1')).toBe(false);
    expect(isNumber(1)).toBe(true);
  });

  it('isString', () => {
    expect(isString('seed')).toBe(true);
    expect(isString(1)).toBe(false);
  });

  it('isRegExp', () => {
    expect(isRegExp('//')).toBe(false);
    expect(isRegExp(/xxx/)).toBe(true);
  });

  it('isArray', () => {
    expect(isArray([])).toBe(true);
    expect(isArray('[]')).toBe(false);
  });

  it('isWindow', () => {
    expect(isWindow(window)).toBe(true);
  });
});