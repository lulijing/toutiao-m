<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" icon="search" slot="title" type="info" size="small" round>搜索</van-button>
    </van-nav-bar>

    <!-- 频道列表 -->
    <!-- 通过v-model绑定当前激活标签对应的索引值，默认情况下启用第一个标签 -->
    <!-- 通过animated属性可以开启切换标签内容时的转场动画 -->
    <!-- 通过swipeable属性可以开启滑动切换标签页 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
        <ArticleList :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChennelEditShow=true">
        <i class="iconfont icongengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道编辑弹出层 -->
    <van-popup v-model="isChennelEditShow" closeable position="bottom" close-icon-position="top-left"
      :style="{ height: '100%' }">
      <ChannelEdit />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './component/article-list'
import ChannelEdit from './component/chennel-edit'
export default {
  name: 'HomeIndex',
  data() {
    return {
      active: 0,
      channels: [], // 频道列表
      isChennelEditShow: false
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  created() {
    this.loadChannels()
  },
  methods: {
    async loadChannels() {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
        // console.log(this.channels)
      } catch (error) {
        this.$toast('获取频道数据失败')
      }
    }
  }
}
</script>

<style lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }

  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }

    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      color: #333333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }

    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.902);
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
