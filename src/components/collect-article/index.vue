<template>
  <van-button :icon="value?'star':'star-o'" :class="{collected:value}" @click="onCollect" :loading="loading" />
</template>

<script>
import { collectionArticle, deleteCollectionArticle } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect() {
      try {
        if (this.value) {
          // 展示loading加载状态
          this.loading = true
          // 已收藏，取消收藏
          await deleteCollectionArticle(this.articleId)
        } else {
          // 未收藏，添加收藏
          await collectionArticle(this.articleId)
        }
        // 更新视图
        // 自定义事件修改数据并不是立即的
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast.fail('操作失败，请重试')
      }
      // 无论成功或者失败 关闭loading加载状态
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
