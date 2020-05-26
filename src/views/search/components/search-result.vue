<template>
  <div class="search-result">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  methods: {
    async onLoad() {
      try {
        // 1.请求获取数据
        const { data } = await getSearchResult({
          page: this.page, // 页码
          per_page: this.page, // 每页大小
          q: this.searchText
        })
        console.log(data)
        // 2. 将数据添加到数组列表中
        // 3. 将本次加载中的loading关闭
        // 4. 判断是否有数据
        // 如果有，则更新获取下一个数据的页码
        // 如果没有，则将加载状态finished设置为结束
      } catch (error) {}
    }
  }
}
</script>

<style scoped lang="less">
</style>
