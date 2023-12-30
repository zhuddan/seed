/**
 * 延时器
 * @param delay
 */
export function sleep(delay?: number): Promise<void>;
export function sleep(callback: () => void, delay?: number): Promise<void>;
export function sleep(arg1?: number | (() => void), arg2?: number): Promise<void> {
  return new Promise<void>((resolve) => {
    if (typeof arg1 === 'function') {
      const callback = arg1;
      const duration = arg2 || 1000;

      const timer = setTimeout(() => {
        callback();
        clearTimeout(timer);
        resolve();
      }, duration);
    }
    else if (typeof arg1 === 'number') {
      const duration = arg1;

      const timer = setTimeout(() => {
        clearTimeout(timer);
        resolve();
      }, duration);
    }
    else if (typeof arg1 === 'undefined') {
      const duration = 1000;
      const timer = setTimeout(() => {
        clearTimeout(timer);
        resolve();
      }, duration);
    }
  });
}
