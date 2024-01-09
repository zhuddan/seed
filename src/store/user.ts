import type { UserModel } from '@/model/user';

import { getInfo as _getInfo, login as _login } from '@/api/login';

import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const user = ref<UserModel | null>(null);
  const roles = ref<string[]>([]);
  const permissions = ref<string[]>([]);

  async function login(username: string, password: string, code: string, uuid: string) {
    const res = await _login(username, password, code, uuid);
    setCacheToken(res.token);
  }
  function logout() {
    return new Promise<''>((resolve) => {
      resetAllState();
      resolve('');
    });
  }

  async function getInfo() {
    const res = await _getInfo();
    user.value = res.user;
    roles.value = res.roles;
    permissions.value = res.permissions;
  }

  function resetAllState() {
    user.value = null;
    roles.value = [];
    permissions.value = [];
    removeCacheToken();
  }

  return {
    user,
    roles,
    permissions,
    login,
    logout,
    getInfo,
    resetAllState,
  };
});
