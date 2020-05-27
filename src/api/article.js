/*
 * 文章请求模块
 */
import request from '@/utils/request'

/**
 * 请求获取文章列表数据  /app/v1_0/articles/:article_id
 */
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

/**
 * 请求获取文章详情
 */
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}
