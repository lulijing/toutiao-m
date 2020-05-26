<template>
  <div>
    <div class="search-container">
      <!--
        在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
       -->
      <form action="/">
        <van-search
          v-model="searchText"
          show-action
          placeholder="请输入搜索关键词"
          background="#3296fa"
          @search="onSearch"
          @cancel="onCancel"
          @focus="isResultShow = false"
        />
      </form>
      <!-- 搜索结果 -->
      <search-result v-if="isResultShow" :search-text="searchText" />

      <!-- 联想建议 -->
      <search-suggestion
        @search="onSearch"
        :search-text="searchText"
        v-else-if="searchText"
      />

      <!-- 搜索历史纪录 -->
      <search-history v-else />
    </div>
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggesition'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'

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
      isResultShow: false // 控制搜索结果的展示
    }
  },
  methods: {
    onSearch(val) {
      this.$toast(val)
      this.searchText = val
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
.search-container{
  .van-search__action{
    color: #fff;
  }
}
</style>
