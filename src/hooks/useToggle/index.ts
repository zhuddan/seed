import { ref } from 'vue';

/**
 * 切换是否
 * @param initialValue
 */
export function useToggle(initialValue?: boolean) {
  const state = ref(!!initialValue);

  function toggle(nextValue?: boolean) {
    if (nextValue != undefined)
      state.value = nextValue;

    else
      state.value = !state.value;
  }

  return [state, toggle] as const;
}