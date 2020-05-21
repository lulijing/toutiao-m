<template>
  <div class="article-list">
    <van-pull-refresh success-duration="1500" :success-text="refreshSuccessText" v-model="isrefreshLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error" error-text="请求失败，点击重新加载" @load="onLoad">
        <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article.title" /> -->
        <ArticleItem v-for="(article,index) in list" :key="index" :article="article" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中loading状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null,
      error: false,
      count: 0,
      isrefreshLoading: false,
      refreshSuccessText: '刷新成功'
    }
  },

  methods: {
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          // timestamp 简单理解就请求数据的页码
          // 请求第1页数据：当前最新时间戳
          // 用于请求之后数据的时间戳会在当前请求结果中返回给你
          timestamp: this.timestamp || Date.now(),
          // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
          with_top: 1
        })

        // 2.把请求结果数据放到list数组中
        const { results } = data.data
        // 数组的展开操作符，它会把数组元素一个一个拿出来
        this.list.push(...results)
        console.log(data)

        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false
        // 4. 判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        // 展示错误状态
        this.error = true
        // 请求失败了，loading也需要关闭
        this.loading = false
      }
    },
    // 当下拉刷新的时候会触发调用该函数
    async onRefresh() {
      try {
        // 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          // 下拉刷新每次请求获取最新数据
          timestamp: Date.now(),
          // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
          with_top: 1
        })
        // 将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)

        // 关闭下拉刷新的loading状态
        this.isrefreshLoading = false

        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (error) {
        this.isrefreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  }
}
</script>
<style scoped lang="less">
.article-list {
  // 百分比单位相对于父元素的
  height: 79vh;
  overflow-y: auto;
}
</style>
