<template>
  <div>
    <div class="search-container">
      <!--
        在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
       -->
      <form class="search-form" action="/">
        <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" background="#3296fa" @search="onSearch"
          @cancel="onCancel" @focus="isResultShow = false" />
      </form>
      <!-- 搜索结果 -->
      <search-result v-if="isResultShow" :search-text="searchText" />

      <!-- 联想建议 -->
      <search-suggestion @search="onSearch" :search-text="searchText" v-else-if="searchText" />

      <!-- 搜索历史纪录 -->
      <search-history v-else :search-histories="searchHistories" @clear-search-histories="searchHistories = []" @search="onSearch" />
    </div>
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggesition'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  data() {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的展示
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [] // 搜索的历史数据
    }
  },
  watch: {
    searchHistories (value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  methods: {
    onSearch(val) {
      // 更新文本框内容
      this.searchText = val
      // 存储搜索历史记录
      // 要求：不要有重复历史记录，最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel() {
      // 返回首页
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
