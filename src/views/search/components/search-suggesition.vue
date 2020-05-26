<template>
  <div class="search-suggestion">
    <van-cell v-for="(text,index) in suggestion" :key="index" icon="search" @click="$emit('search',text)">
      <div slot="title" v-html="hightLight(text)" ></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestion: [] // 联想建议数组
    }
  },
  watch: {
    searchText: {
      // 当searchText发生改变的时候会调用handler函数
      // handler 函数名称是固定的
      handler: debounce(function(value) {
        this.loadSearchSuggestion(value)
      }, 1000),
      // handler(value) {
      //   this.loadSearchSuggestion(value)
      // },
      // 该回调将会在侦听开始之后被立即调用
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestion(q) {
      try {
        const { data } = await getSearchSuggestion(q)
        this.suggestion = data.data.options
      } catch (error) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    hightLight(text) {
      const hightLightStr = `<span class="active">${this.searchText}</span>`
      // 正则表示式 // 中间的内容都会当做匹配字符来使用而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动new RegExp
      // RegExp 正则表达式构造函数
      // 参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      // 参数2：匹配模式，要写道字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, hightLightStr)
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion{
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
