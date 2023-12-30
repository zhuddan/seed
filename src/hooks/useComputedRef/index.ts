import type { ComputedRef, MaybeRefOrGetter } from 'vue';

import { isFunction } from '@/utils/helpers';

import { computed, unref } from 'vue';

/**
 * 同 vue toValue 函数
 * @param value
 */
export function useComputedRef<T>(value: MaybeRefOrGetter<T>): ComputedRef<T> {
  const computedRef = computed(() => isFunction(value) ? (value as any)() : unref(value));
  return computedRef;
}
