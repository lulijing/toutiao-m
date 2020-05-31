<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="item in list" :key="item" :title="item" />
  </van-list>
</template>

<script>
// import { getComments } from '@/api/comment'
export default {
  name: 'CommentList',
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad() {
      try {
        // 1.请求获取数据
        // 2.将数据添加到列表中
        // 3.将loading设置为false
        // 4.判断是否还有数据
        // 有 就更新获取下一页的数据
        // 没有就将finished设置结束
      } catch (error) {

      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
