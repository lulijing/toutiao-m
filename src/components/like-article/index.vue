<template>
  <van-button :icon="value === 1?'good-job':'good-job-o'" :class="{liked: value === 1 }" @click="onLiked"
    :loading="loading" />
</template>

<script>
import { likeArticle, dislikeArticle } from '@/api/article'
export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false // loading加载状态
    }
  },
  methods: {
    // 文章点赞
    async onLiked() {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 已点赞，取消点赞
          await dislikeArticle(this.articleId)
        } else {
          // 未点赞，点赞
          await likeArticle(this.articleId)
          status = 1
        }
        // 更新视图
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>
