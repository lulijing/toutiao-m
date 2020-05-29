<template>
  <van-button :icon="value?'star':'star-o'" :class="{collected:value}"/>
</template>

<script>
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">
.collected{
  .van-icon{
    color: #ffa500;
  }
}
</style>
