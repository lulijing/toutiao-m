<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="个人信息" left-arrow @click-left="$router.back()" />
    <!-- 导航栏 -->

    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 个人信息 -->
    <van-cell title="头像"  @click="$refs.file.click()" is-link>
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

    <!-- 编辑头像 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height:100%;"
    >
      <UpdatePhoto @update-photo ="user.photo = $event" :img="img" v-if="isUpdatePhotoShow" @close="isUpdatePhotoShow = false" />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateSex from './components/update-sex'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateSex,
    UpdateBirthday,
    UpdatePhoto
  },
  data() {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateSexShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null // 预览的图片
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
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      console.log(file, '1111')
      // 基于文件对象获取 blob 数据
      this.img = window.URL.createObjectURL(file)
      // console.log(data)
      // 展示预览弹出层
      this.isUpdatePhotoShow = true

      // file-input 如果选了同一个文件不会触发change事件
      // 解决办法就是每次使用完毕，把它的value清空
      this.$refs.file.value = ''
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
