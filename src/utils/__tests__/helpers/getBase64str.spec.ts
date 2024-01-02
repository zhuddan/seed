import { getBase64str } from '@/utils/helpers';

import { expect, test } from 'vitest';
//
// describe('getBase64str', () => {
test('getBase64str', () => {
  expect(getBase64str('\nz\nd\n')).toBe('zd');
});
// });