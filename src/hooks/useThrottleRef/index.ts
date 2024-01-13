import { throttle } from 'lodash-es';
import { customRef } from 'vue';
/**
 *
 * @param value
 * @param delay
 */
export function useThrottleRef<T>(value: T, delay = 100) {
  return customRef((track, trigger) => {
    const onSet = throttle((newValue: T) => {
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