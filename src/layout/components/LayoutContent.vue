<script setup lang="ts">
import BackTop from '@/components/BackTop/BackTop.vue';

defineOptions({
  name: 'LayoutContent',
});

const layout = ref(false);
const router = useRouter();
router.beforeEach(() => {
  layout.value = false;
});
router.afterEach((a) => {
  layout.value = a.meta.layout === false ? false : true;
});
</script>

<template>
  <div class="content-wrapper">
    <main
      id="content"
      :class="{ layout }"
    >
      <router-view />
    </main>
    <BackTop />
  </div>
</template>

<style scoped lang="scss">
.content-wrapper {
  flex: 1;
  background: #f6f6f6;
}

#content {
  overflow-x: hidden;
  height: var(--app-content-height);
  .layout{
    padding: var(--app-content-padding);
  }
}
</style>
