import { formatFileSize } from '../helpers';
import { describe, expect, it } from 'vitest';

describe('formatFileSize test', () => {
  it('1000 => 1000 B', () => {
    expect(formatFileSize(1000)).toBe('1000 B');
  });

  it('1024 => 1.00 KB', () => {
    expect(formatFileSize(1024)).toBe('1.00 KB');
  });

  it('1024 * 5 => 5.00 KB', () => {
    expect(formatFileSize(1024 * 5)).toBe('5.00 KB');
  });

  it('1024 * 1024 * 5 => 5.00 MB', () => {
    expect(formatFileSize(1024 * 1024 * 5)).toBe('5.00 MB');
  });

  it('1024 * 1024 * 1024 => 5.00 MB', () => {
    expect(formatFileSize(1024 * 1024 * 1024 * 3.6)).toBe('3.60 GB');
  });
});