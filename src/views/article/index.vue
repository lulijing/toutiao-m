<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条" @click-left="$router.back()"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" :src="article.aut_photo" />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>

          <!-- 加载关注组件 -->
          <!--
            模板中的 $event 是事件参数
            当我们传递给子组件的数据既要使用还要修改。
              传递：props
                :is-followed="article.is_followed"
              修改：自定义事件
                @update-is_followed="article.is_followed = $event"
            简写方式：在组件上使用 v-model
              value="article.is_followed"
              @input="article.is_followed = $event"

            如果需要修改 v-model 的规则名称，可以通过子组件的 model 属性来配置修改

            一个组件上只能使用一次 v-model，
            如果有多个数据需要实现类似于 v-model 的效果，咋办？
            可以使用属性的 .sync 修饰符。
           -->
          <follow-user v-model="article.is_followed" :userId="article.aut_id" class="follow-btn" />
          <!-- <follow-user :is-followed="article.is_followed" :userId="article.aut_id" @update-follow="article.is_followed = $event" class="follow-btn" /> -->
          <!-- <van-button v-if="article.is_followed" @click="onFollow" :loading="followLoading" class="follow-btn" round size="small">已关注
          </van-button>
          <van-button v-else class="follow-btn" @click="onFollow" :loading="followLoading" type="info" color="#3296fa" round size="small"
            icon="plus">关注</van-button> -->
          <!-- 加载关注组件 -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-bodys" v-html="article.content" ref="article-content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论列表start -->
        <comment-list :list="commentList" :source="article.art_id" @totalCount="totalCount = $event.total_count"
          @reply-click="obReplyClick" />
        <!-- 评论列表end -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small" @click="isPostShow = true">写评论</van-button>
          <van-icon class="comment-icon" name="comment-o" :info="totalCount" />
          <!-- 收藏按钮组件 -->
          <collect-article v-model="article.is_collected" :article-id="article.art_id" class="btn-item" />

          <!-- 点赞按钮组件 -->
          <!-- <van-button class="btn-item" icon="good-job-o" /> -->
          <like-article class="btn-item" v-model="article.attitude" :article-id="article.art_id" />

          <!-- 分享按钮 -->
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 发布评论 -->
        <van-popup v-model="isPostShow" position="bottom">
          <CommentPost :list="commentList" :target="article.art_id" @post-success="onPostSuccess" />
        </van-popup>
        <!-- 发布评论 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 评论回复弹层 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height:100%">
      <CommentReply v-if="isReplyShow" :comment="currentComment" @close="isReplyShow = false" />
    </van-popup>
    <!-- 评论回复弹层 -->
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import CommentList from './components/comment-list'
import CommentPost from './components/comment-post'
import CommentReply from './components/comment-reply'
export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  // 给所有的后代组件提供数据
  provide: function() {
    return {
      articleId: this.articleId
    }
  },
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply
  },
  data() {
    return {
      article: {}, // 文章详情
      loading: false, // 加载中的loading状态
      errStatus: 0,
      totalCount: 0, // 评论总数
      isPostShow: false, // 控制发布评论的显示状态
      commentList: [], // 评论列表
      isReplyShow: false,
      currentComment: {} // 当前点击的回复项
    }
  },
  created() {
    this.loadArticle()
  },
  methods: {
    async loadArticle() {
      try {
        // 展示loading加载中
        this.loading = true
        const { data } = await getArticleById(this.articleId)
        // 模拟失败
        // if (Math.random() > 0.5) {
        //   JSON.parse('sfdfd')
        // }
        this.article = data.data
        // console.log(data)
        // 初始化图片点击预览
        // console.log(this.$refs['article-content'])
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errStatus = 404
        }
        console.log('获取数据失败', error)
      }
      // 无论成功还是失败 都要关闭loading
      this.loading = false
    },
    previewImage() {
      // 得到所有的 img 节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      // console.log(imgs)
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        // 给每个 img 注册点击事件，在处理函数中调用预览
        img.onclick = () => {
          ImagePreview({
            // 预览的图片地址数组
            images,
            // 起始位置，从 0 开始
            startPosition: index
          })
        }
      })
    },
    onPostSuccess(data) {
      // 关闭弹层
      this.isPostShow = false

      // 将发布内容显示到列表顶部
      this.commentList.unshift(data.new_obj)
    },
    obReplyClick(comment) {
      this.currentComment = comment
      // console.log(comment)
      // 显示评论回复弹出层
      this.isReplyShow = true
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
  }
  .article-detail {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
    }
    .comment-icon {
      top: 2px;
      color: #777;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
    .btn-item {
      border: none;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #777777;
    }
    .collect-btn--collected {
      color: #ffa500;
    }
    .like-btn--liked {
      color: #e5645f;
    }
  }
}
</style>
