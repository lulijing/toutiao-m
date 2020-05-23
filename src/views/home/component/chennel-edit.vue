<template>
  <div class="channel-edit">
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" type="danger" plain round size="mini">编辑</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item icon="clear" class="grid-item" v-for="(channel,index) in myChannels" :key="index">
        <span class="text" :class="{active:index === active}" slot="text">{{channel.name}}</span>
      </van-grid-item>
    </van-grid>

    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item v-for="(channel,index) in recommendChannels" :key="index" icon="plus" class="grid-item" :text="channel.name" />
    </van-grid>

  </div>
</template>

<script>
import { allChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [] // 全部频道数组
    }
  },
  computed: {
    recommendChannels () {
      // 数组的 filter 方法：遍历数组，把符合条件的元素存储到新数组中并返回
      return this.allChannels.filter(channel => {
        // const channels = []

        // 数组的 find 方法：遍历数组，把符合条件的第1个元素返回
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })

        // return channels
      })
    }
  },
  mounted() {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await allChannels()
        this.allChannels = data.data.channels
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    // width: 104px;
    // height: 48px;
    font-size: 26px;
    color: #f85959;
    // border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
