import { debounce } from 'lodash-es';

/**
 *
 * @param value
 * @param delay
 */
export function useDebounceRef<T>(value: T, delay = 100) {
  return customRef((track, trigger) => {
    const onSet = debounce((newValue: T) => {
      value = newValue;
      trigger();
    }, delay);
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        onSet(newValue);
      },
    };
  });
}
