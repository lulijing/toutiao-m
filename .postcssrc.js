/*
* PostCSS 配置文件
*/
module.exports = {
  // 配置要使用的PostCSS插件
  // 作用：生成浏览器CSS样式规则前缀
  // VueCLI 内部已经配置了 autoprefixer 插件
  // 所以重复配置了一次，产生了冲突
  plugins: {
    //   autoprefixer: { // autoprefixer 插件的配置
    //     // 配置要兼容到的环境信息
    //     browsers: ['Android >= 4.0', 'iOS >= 8'],
    //   },
    // 配置使用 postcss-pxtorem 插件
    'postcss-pxtorem': {
      // lib-flexible 的rem适配方案：把一行分为10份，每份就是十分之一
      // rootValue 应该设置为设计稿宽度的十分之一
      // 我们的设计稿是750，所以应该设置为750/10=75
      // 但是vant建议设置为37.5 为什么？因为vant是基于375写的
      // 所以必须设置为37.5，唯一的缺点就是使用我们设计稿的尺寸都必须 /2
      // 有没有更好的办法？
      // 如果是vant的样式，就按照37.5来转换
      // 如果是我们自己的样式，就按照75来转换
      // 通过查阅文档，发现rootValue支持两种类型
      // 数字：固定的数值
      // 函数：可以动态处理返回
      //    postcss-pxtorem处理每个css文件的时候都会调用这个函数
      //    它会把被处理的css文件相关的信息通过参数传递给该函数
      // rootValue: 37.5,
      rootValue({ file }) {
        // console.log(obj)
        // console.log('处理的css文件',file)
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的CSS属性
      // * 表示所有
      // propList: ['height'] // 只转换高
      propList: ['*']
    }
  }
}
