<template>

    <van-button v-if="isFollowed" @click="onFollow" :loading="loading" class="follow-btn" round
      size="small">已关注
    </van-button>
    <van-button v-else class="follow-btn" @click="onFollow" :loading="loading" type="info" color="#3296fa" round
      size="small" icon="plus">关注</van-button>
</template>

<script>
import { onFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  model: {
    prop: 'isFollowed',
    event: 'update-follow'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false // 关注按钮的loading状态
    }
  },
  methods: {
    async onFollow() {
      this.loading = true // 开启关注按钮loading状态
      try {
        if (this.isFollowed) {
          // 已关注，取消关注
          await deleteFollow(this.userId)
        } else {
          // 未关注，添加关注
          await onFollow(this.userId)
        }
        // 更新视图状态
        // this.article.is_followed = !this.article.is_followed
        this.$emit('update-follow', !this.isFollowed)
      } catch (error) {
        let message = '操作失败，请重试'
        if (error.response && error.response.status === 400) {
          message = '你不能关注你自己'
        }
        this.$toast(message)
      }
      this.loading = false // 关闭关注按钮loading状态
    }
  }
}
</script>

<style scoped lang="less">
</style>
