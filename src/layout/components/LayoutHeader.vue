<script setup lang="ts">
import AppLogo from '@/components/AppLogo/AppLogo.vue';

defineOptions({
  name: 'LayoutHeader',
});
const userStore = useUserStore();

const router = useRouter();

async function handleLogout() {
  if (!confirm('确定退出登录？')) return;
  await userStore.logout();
  router.replace('/redirect/');
}
</script>

<template>
  <header class="layout-header">
    <div class="layout-header_inner container flex items-center w-full">
      <AppLogo />
      <div class="flex-1"></div>
      <nav class="">
        <router-link
          to="/"
          class="text-[#666] [&.router-link-active]:text-primary"
        >
          home
        </router-link>
        <router-link
          class="text-[#666] [&.router-link-active]:text-primary"
          to="/about"
        >
          about
        </router-link>
        <router-link
          v-if="!userStore.user"
          to="/login"
        >
          login
        </router-link>
      </nav>
      <div
        v-if="userStore.user"
        class="user-info flex items-center"
        style="margin-left: 20px;"
      >
        <span>{{ userStore.user?.userName?.toLocaleUpperCase() }}</span>
        <button
          class="btn"
          @click="handleLogout"
        >
          退出登录
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.layout-header {
    background: white;
    position: sticky;
    box-sizing: border-box;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    animation-duration: 0.1s;
  }

  .layout-header_inner {
    height: var(--app-header-hight);
    border-bottom: 1px solid #ebebeb;
    box-sizing: border-box;
  }

  .user-info {

    button {
      margin-left: 10px;
    }
  }

  .breadcrumbs-container {
    background-color: #f9f9fb;
    border-bottom: 1px solid #cdcdcd;
    height: var(--app-breadcrumbs-hight);
    display: flex;
    align-items: center;

    .sidebar-button {
      background: none;
      border: 0;
      padding: 0;
      margin-right: 10px;

      &:hover {
        cursor: pointer;
      }

      .app-iconify {
        transition: 150ms ease all;
      }

      &.collapse {
        .app-iconify {
          transform: scaleX(-1);
        }
      }
    }
  }

  nav{
    a{
      padding: 6px 0;
      text-decoration: none;

      &+a{
        margin-left: 10px;
      }

      &.router-link-exact-active{
        border-bottom: 4px solid;
        font-weight: 600;
      }
    }
  }
</style>
