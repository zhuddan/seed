import type { AppState } from './types/app';

import { defineStore } from 'pinia';

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
  }),
  actions: {

  },
  getters: {
  },
});
