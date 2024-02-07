<script setup lang="ts">
const d = defineAsyncComponent;

const icons = [
  // @iconify/json
  d(() => import('~icons/ic/baseline-plus')),
  d(() => import('~icons/skill-icons/nginx')),
  // 本地svg
  d(async () => h('span', { innerHTML: (await import('~icons/icon/download-count?raw'))['default'] })),
  d(async () => h('span', { innerHTML: (await import('~icons/icon/dynamic-avatar-1?raw'))['default'] })),
  d(async () => h('span', { innerHTML: (await import('~icons/icon/dynamic-avatar-2?raw'))['default'] })),
  d(async () => h('span', { innerHTML: (await import('~icons/icon/dynamic-avatar-3?raw'))['default'] })),
  d(async () => h('span', { innerHTML: (await import('~icons/icon/dynamic-avatar-4?raw'))['default'] })),
  d(async () => h('span', { innerHTML: (await import('~icons/icon/dynamic-avatar-5?raw'))['default'] })),
  d(async () => h('span', { innerHTML: (await import('~icons/icon/dynamic-avatar-6?raw'))['default'] })),
  d(async () => h('span', { innerHTML: (await import('~icons/icon/ic_right?raw'))['default'] })),
  d(async () => h('span', { innerHTML: (await import('~icons/icon/moon?raw'))['default'] })),
  d(async () => h('span', { innerHTML: (await import('~icons/icon/sun?raw'))['default'] })),
  d(async () => h('span', { innerHTML: (await import('~icons/icon/test?raw'))['default'] })),
  d(async () => h('span', { innerHTML: (await import('~icons/icon/total-sales?raw'))['default'] })),
  d(async () => h('span', { innerHTML: (await import('~icons/icon/transaction?raw'))['default'] })),
  d(async () => h('span', { innerHTML: (await import('~icons/icon/visit-count?raw'))['default'] })),
];
</script>

<template>
  <div class="box">
    <div v-for="(item, index) in icons" :key="index" class="item">
      <component :is="item" />
    </div>
    <div class="item">
      <i-twemoji-flag-china />
    </div>
    <div class="item">
      <i-twemoji-flag-aruba />
    </div>
  </div>
</template>

<style lang="scss">
.box{
  display: grid;
  padding: 10px;
  grid-template-columns: repeat(15,auto);
  gap: 10px;
}
.item{
  flex-shrink: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 3em;
  width: 3em;
  border: 1px solid;
  overflow: hidden;
}
</style>