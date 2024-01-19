<script setup lang="ts">
import { listGen } from '@/api/gen';

const title = ref('');

const {
  list,
  listLoading,
  finished,
  error,
  refreshing,
  errorMessage,
  enablePullRefresh,
  empty,
  isSearch,
  onRefresh,
  getList,
  onSearch,
} = useDataList(listGen, {
  filter() {
    return {
      // title: title.value,
      // operIp: '183.54.208.219',
      // userName: title.value,
    };
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
      @search="onSearch()"
    />
    <div
      :style="{
        height: 'calc(var(--app-content-height) - 20px - var(--van-search-input-height))',
        overflowY: 'scroll',
      }"
    >
      <van-pull-refresh
        v-model="refreshing"
        finished-text="finished-text"
        loading-text="loading"
        :disabled="!enablePullRefresh"
        @refresh="onRefresh"
      >
        <div
          :style="{
            'min-height': 'calc(var(--app-content-height) - 20px - var(--van-search-input-height))',
          }"
        >
          <van-list
            v-model:loading="listLoading"
            v-model:error="error"
            :finished="finished"
            @load="getList"
          >
            <van-cell
              v-for="item in list"
              :key="item.tableComment"
              :title="item.tableName"
              label="描述信息"
              :value="item.tableName"
            />

            <template #loading>
              <div
                v-if="empty && isSearch" class="flex-center flex-direction-column"
                :style="{
                  height: 'calc(var(--app-content-height) - 20px - var(--van-search-input-height))',
                }"
              >
                <!-- list 为空时 使用 svg -->
                sss
                <p style="line-height: 1;">
                  正在搜索
                </p>
              </div>

              <template v-else-if="!refreshing">
                加载中...
              </template>
            </template>

            <!-- 暂无数据 -->
            <template v-if="!error" #finished>
              <!-- list 为空时 使用 van-empty -->
              <van-empty v-if="empty" image="search" description="没有更多数据了" />
              <template v-else>
                暂无更多数据
              </template>
            </template>

            <!-- 错误信息 -->
            <template #error>
              <!-- list 为空时 使用 van-empty -->
              <van-empty v-if="empty" image="error" :description="errorMessage" />
              <template v-else>
                {{ errorMessage }}
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