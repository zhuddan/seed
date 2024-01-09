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
  isSearch,
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

            <template #loading>
              <div
                v-if="empty && isSearch" class="flex-center flex-direction-column"
                :style="{
                  height: 'calc(var(--app-content-height) - 20px - var(--van-search-input-height))',
                }"
              >
                <!-- list 为空时 使用 svg -->
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                  <g transform="translate(50 50)">
                    <g transform="scale(0.8)">
                      <g transform="translate(-50 -50)">
                        <g>
                          <animateTransform attributeName="transform" type="translate" repeatCount="indefinite" dur="2s" values="-20 -20;20 -20;0 20;-20 -20" keyTimes="0;0.33;0.66;1"></animateTransform>
                          <!-- <path fill="#ffffff" d="M44.19 26.158c-4.817 0-9.345 1.876-12.751 5.282c-3.406 3.406-5.282 7.934-5.282 12.751 c0 4.817 1.876 9.345 5.282 12.751c3.406 3.406 7.934 5.282 12.751 5.282s9.345-1.876 12.751-5.282 c3.406-3.406 5.282-7.934 5.282-12.751c0-4.817-1.876-9.345-5.282-12.751C53.536 28.033 49.007 26.158 44.19 26.158z"></path> -->
                          <path fill="#42b883" d="M78.712 72.492L67.593 61.373l-3.475-3.475c1.621-2.352 2.779-4.926 3.475-7.596c1.044-4.008 1.044-8.23 0-12.238 c-1.048-4.022-3.146-7.827-6.297-10.979C56.572 22.362 50.381 20 44.19 20C38 20 31.809 22.362 27.085 27.085 c-9.447 9.447-9.447 24.763 0 34.21C31.809 66.019 38 68.381 44.19 68.381c4.798 0 9.593-1.425 13.708-4.262l9.695 9.695 l4.899 4.899C73.351 79.571 74.476 80 75.602 80s2.251-0.429 3.11-1.288C80.429 76.994 80.429 74.209 78.712 72.492z M56.942 56.942 c-3.406 3.406-7.934 5.282-12.751 5.282s-9.345-1.876-12.751-5.282c-3.406-3.406-5.282-7.934-5.282-12.751 c0-4.817 1.876-9.345 5.282-12.751c3.406-3.406 7.934-5.282 12.751-5.282c4.817 0 9.345 1.876 12.751 5.282 c3.406 3.406 5.282 7.934 5.282 12.751C62.223 49.007 60.347 53.536 56.942 56.942z"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
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