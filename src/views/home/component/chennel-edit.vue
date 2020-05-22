<template>
  <div class="channel-edit">
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" type="danger" plain round size="small">编辑</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item  class="grid-item" v-for="value in 8" :key="value" text="文字" />
    </van-grid>

    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item icon="plus" class="grid-item" v-for="value in 8" :key="value" text="文字" />
    </van-grid>

  </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 28px;
        color: #222;
      }
    }
  }
}
</style>
