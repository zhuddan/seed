import {} from '@vue/shared';
import type { RouteRecordRaw } from 'vue-router';

import { defineStore } from 'pinia';

export const usePermissionStore = defineStore('permission', () => {
  const routes = ref<RouteRecordRaw[]>([]);
  return {
    routes,
  };
});
