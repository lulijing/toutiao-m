<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      right-text="完成"
      left-text="取消"
      @click-left="$emit('close')"
      @click-right="onUpdate"
    />

    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        maxlength="10"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localName: this.value
    }
  },
  methods: {
    async onUpdate() {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        await updateUserProfile({
          name: localName
        })
        // console.log(data)
        // 更新视图
        this.$emit('input', localName)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.field-wrap{
  padding: 20px;
}
</style>
