<script setup lang="ts">
import { listGen } from '@/api/gen';

const title = ref('');

const [state, actions] = useListData(listGen, {
  filter() {
    return {
      // title: title.value,
      // operIp: '183.54.208.219',
      // userName: title.value,

    };
  },
});

const refresherTriggeredModel = computed({
  get() {
    return !!state?.refresherTriggered;
  },
  set(value) {
    actions.setState('refresherTriggered', value);
  },
});

const refresherDisabled = ref(false);
const refresherEnabled = computed(() => {
  if (refresherDisabled.value) return false;
  if (refresherTriggeredModel.value) return true;
  return !state.loading;
});

const loading = computed({
  get() {
    return state.loading;
  },
  set(val) {
    actions.setState('loading', val);
  },
});

const error = computed({
  get() {
    return state.error;
  },
  set(val) {
    actions.setState('error', val);
  },
});
</script>

<template>
  <div style="height: var(--app-content-height);">
    <van-search
      v-model="title"
      shape="round"
      background="#4fc08d"
      placeholder="请输入搜索关键词"
      @search="actions.onSearch()"
    />
    <div
      :style="{
        height: 'calc(var(--app-content-height) - 20px - var(--van-search-input-height))',
        overflowY: 'scroll',
      }"
    >
      <van-pull-refresh
        v-model="refresherTriggeredModel"
        finished-text="finished-text"
        loading-text="loading"
        :disabled="!refresherEnabled"
        @refresh="actions.onRefresh"
      >
        <div
          :style="{
            'min-height': 'calc(var(--app-content-height) - 20px - var(--van-search-input-height))',
          }"
        >
          <van-list
            v-model:loading="loading"
            v-model:error="error"
            :finished="state.finished"
            @load="actions.getList"
          >
            <van-cell
              v-for="item in state.list"
              :key="item.tableName"
              :title="item.createTime"
              label="描述信息"
              :value="item.moduleName"
              clickable
              is-link
              :to="{
                path: './detail',
                query: { id: item.tableId },
              }"
            />

            <template #loading>
              <div
                v-if="state.isEmpty && state.isSearch" class="flex-center flex-direction-column"
                :style="{
                  height: 'calc(var(--app-content-height) - 20px - var(--van-search-input-height))',
                }"
              >
                <!-- list 为空时 使用 svg -->
                <p style="line-height: 1;">
                  正在搜索
                </p>
              </div>

              <template v-else-if="!state.refresherTriggered">
                加载中...
              </template>
            </template>

            <!-- 暂无数据 -->
            <template v-if="!error" #finished>
              <!-- list 为空时 使用 van-empty -->
              <van-empty v-if="state.isEmpty" image="search" description="没有更多数据了" />
              <template v-else>
                暂无更多数据
              </template>
            </template>

            <!-- 错误信息 -->
            <template #error>
              <!-- list 为空时 使用 van-empty -->
              <van-empty v-if="state.isEmpty" image="error" description="加载出错" />
              <template v-else>
              </template>
            </template>
          </van-list>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<style scoped>

</style>