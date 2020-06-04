<template>
  <div class="my-container">
    <!-- 已登录样式 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image round fit="cover" class="avatar" :src="userInfo.photo" />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <div class="count">{{userInfo.art_count}}</div>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <div class="count">{{userInfo.follow_count}}</div>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <div class="count">{{userInfo.fans_count}}</div>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <div class="count">{{userInfo.like_count}}</div>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录样式 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="登录按钮">
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 导航 -->
    <van-grid class="grid-nav mb-10" :column-num="2" clickable>
      <van-grid-item text="文字" class="grid-item">
        <i slot="icon" class="iconfont iconshoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item text="文字" class="grid-item">
        <i slot="icon" class="iconfont iconlishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell title="消息通知" is-link />
    <van-cell class="mb-10" title="小智同学" is-link />
    <van-cell v-if="user" @click="logout" class="logout-cell" clickable title="退出登录" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    // 如果用户登录了，则请求加载用户信息数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    // 退出登录按钮
    logout() {
      // 退出提示
      this.$dialog
        .confirm({
          title: '确认退出吗'
        })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
      // 确认退出：清除登录状态（容器中的user+本地存储中的user）
    },

    async loadUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        // console.log(data)
      } catch (error) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 360px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info {
    .base-info {
      height: 230px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav {
    .grid-item {
      height: 140px;
      i.iconfont {
        font-size: 45px;
      }
      .iconshoucang {
        color: #eb5253;
      }
      .iconlishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-10 {
    margin-bottom: 10px;
  }
}
</style>
