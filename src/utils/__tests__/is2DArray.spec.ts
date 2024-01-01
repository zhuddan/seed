import { is2DArray } from '../helpers';
import { expect, it } from 'vitest';

it('is2DArray', () => {
  expect(is2DArray(1)).toBe(false);
  expect(is2DArray([])).toBe(false);
  expect(is2DArray([[]])).toBe(true);
  expect(is2DArray([[[]]])).toBe(true);
});