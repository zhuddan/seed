import type { PermissionState } from './types/permission';

import { defineStore } from 'pinia';

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routes: [],
  }),
  actions: {

  },
});
