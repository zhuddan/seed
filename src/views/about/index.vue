<script setup lang="ts">
import { listUser } from '@/api/user';

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
  onRefresh,
  getList,
  onSearch,
} = useDataList(listUser, {
  filter() {
    return {
      // title: title.value,
      // operIp: '183.54.208.219',
      userName: title.value,
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
              :key="item.userId"
              :title="item.userName"
              label="描述信息"
              :value="item.nickName"
            />
            <template v-if="!error" #finished>
              <van-empty v-if="empty" image="search" description="没有更多数据了" />
              <template v-else>
                暂无更多数据
              </template>
            </template>

            <template #loading>
              <template v-if="!refreshing">
                加载中...
              </template>
            </template>

            <template #error>
              <van-empty v-if="!list.length" image="error" :description="errorMessage" />
              <template v-else>
                {{ errorMessage }}2222
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