<script setup lang="ts">
const d = defineAsyncComponent;

const icons = [
  // @iconify/json
  d(() => import('~icons/ic/baseline-plus')),
  d(() => import('~icons/skill-icons/nginx')),
  // 本地svg
  d(async () => h('span', { innerHTML: (await import('~icons/icon/download-count?raw'))['default'] })),
];
</script>

<template>
  <div class="container">
    <h1>{{ APP_TITLE }}</h1>
    <div class="box">
      <div
        v-for="(item, index) in icons"
        :key="index"
        class="item"
      >
        <component :is="item" />
      </div>
      <div class="item">
        <i-twemoji-flag-china />
      </div>
      <div class="item">
        <i-twemoji-flag-aruba />
      </div>
      <div class="item">
        <i-icon-logo style="width: 2em;" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.box{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(3em, 1fr));
  gap: 10px;
  max-width: 30em;
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