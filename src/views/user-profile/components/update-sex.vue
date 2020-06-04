<template>
  <div class="update-sex">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateSex',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      localSex: this.value
    }
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const localSex = this.localSex
        await updateUserProfile({
          sex: localSex
        })
        // console.log(data)
        // 更新视图
        this.$emit('input', localSex)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    },
    onChange(picker, value, index) {
      this.localSex = index
    }
  }
}
</script>

<style scoped lang="less">
</style>
