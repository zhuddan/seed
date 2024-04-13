<script setup lang="ts">
import { getCodeImg } from '@/api/login';

const router = useRouter();
const username = ref('admin');
const password = ref('admin123');
const code = ref('');
const uuid = ref('');
const codeUrl = ref('');

const userStore = useUserStore();
const loading = ref(false);
function handleLogin() {
  if (!username.value) {
    alert('用户名不能为空');
    return;
  }
  if (!password.value) {
    alert('密码不能为空');
    return;
  }

  if (!(`${code.value}`)) {
    alert('验证码不能为空');
    return;
  }
  loading.value = true;
  userStore
    .login(username.value, password.value, code.value, uuid.value)
    .then(() => {
      router.push('/');
    })
    .catch(() => {
      code.value = '';
      getCode();
    })
    .finally(() => {
      loading.value = false;
    });
}
function getCode() {
  getCodeImg().then((res) => {
    codeUrl.value = `data:image/gif;base64,${res.img}`;
    uuid.value = res.uuid;
  });
}
getCode();
</script>

<template>
  <div style="overflow: hidden">
    <div
      class="login w-320 mx-auto mt-80"
    >
      <input
        id="username"
        v-model="username"
        class="input w-full"
        type="text"
        placeholder="用户名"
      >
      <input
        id="password"
        v-model="password"
        class="input mt-20 w-full"
        type="text"
        placeholder="密码"
      >
      <div class="flex h-32 mt-20 items-center justify-between">
        <input
          id="code"
          v-model="code"
          type="number"
          class="input w-full"
          placeholder="验证码"
          @keydown.enter="handleLogin"
        >
        <img
          :src="codeUrl"
          object-fit="fill"
          class="h-full ml-10"
          @click="getCode"
        >
      </div>
      <button
        :disabled="loading"
        class="btn w-full mt-10"
        @click="handleLogin"
      >
        {{
          !loading ? 'login' : 'logging...'
        }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
