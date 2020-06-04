<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="个人信息" left-arrow @click="$router.back()" />
    <!-- 导航栏 -->

    <!-- 个人信息 -->
    <van-cell title="头像" is-link>
      <van-image class="avatar" fit="cover" round :src="user.photo"></van-image>
    </van-cell>
    <van-cell @click="isUpdateNameShow = true" title="昵称" :value="user.name" is-link></van-cell>
    <van-cell @click="isUpdateSexShow = true" title="性别" :value="user.gender === 0 ? '男': '女'" is-link></van-cell>
    <van-cell @click="isUpdateBirthdayShow = true" title="生日" :value="user.birthday ? user.birthday : '未设置'" is-link></van-cell>
    <!-- 个人信息 -->

    <!-- 编辑昵称 -->
    <van-popup
      v-model="isUpdateNameShow"
      style="height:100%;"
      position="bottom"
    >
      <UpdateName v-if="isUpdateNameShow" v-model="user.name" @close="isUpdateNameShow = false"/>
    </van-popup>

    <!-- 编辑性别 -->
    <van-popup
      v-model="isUpdateSexShow"
      position="bottom"
    >
      <UpdateSex v-if="isUpdateSexShow" v-model="user.gender" @close="isUpdateSexShow = false"/>
    </van-popup>

    <!-- 编辑生日 -->
    <van-popup
      v-model="isUpdateBirthdayShow"
      position="bottom"
    >
      <UpdateBirthday v-if="isUpdateBirthdayShow" v-model="user.birthday" @close="isUpdateBirthdayShow = false"/>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateSex from './components/update-sex'
import UpdateBirthday from './components/update-birthday'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateSex,
    UpdateBirthday
  },
  data() {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateSexShow: false,
      isUpdateBirthdayShow: false
    }
  },
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
        console.log(data)
      } catch (error) {
        this.$toast.fail('获取用户信息失败，请重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup{
    background-color: #f5f7f9;
  }
}
</style>
