import { describe, expect, it } from 'vitest';

const dicts = [
  {
    label: '男',
    value: 1,
  },
  {
    label: '女',
    value: 2,
  },
  {
    label: '其他',
    value: 3,
  },
];

const symbol = '💊';

describe('format test', () => {
  it('format dicts normal', () => {
    expect(format(dicts, 2)).toBe('女');
  });

  it('format dicts with raw', () => {
    expect(format(dicts, 1, { isRaw: true })).toStrictEqual(dicts[0]);
  });

  it('format dicts with array', () => {
    expect(format(dicts, [1, 2, 3])).toBe('男/女/其他');
  });

  it('format dicts with array and raw', () => {
    expect(format(dicts, [1, 2, 3], { isRaw: true })).toStrictEqual(dicts);
  });

  it('format dicts with symbol', () => {
    expect(format(dicts, [1, 2], { symbol })).toBe(`男${symbol}女`);
  });

  it('format dicts with labelField', () => {
    expect(format(dicts, [1, 2], { labelField: 'value' })).toBe('1/2');
  });

  it('format dicts with valueField', () => {
    expect(format(dicts, ['男', '女'], { valueField: 'label' })).toBe('男/女');
  });
});