type DebounceFunction = <T extends (...args: any[]) => any>(
  func: T,
  delay?: number
) => (...args: Parameters<T>) => void;

export const debounce: DebounceFunction = (func, delay = 1000) => {
  let timer: NodeJS.Timeout;

  return async (...args) => {
    clearTimeout(timer);
    return new Promise<void>((resolve) => {
      timer = setTimeout(async () => {
        await func(...args);
        resolve();
      }, delay);
    });
  };
};
