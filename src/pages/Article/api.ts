import request from '@src/util/request'



export const getArticle = (params) => {
  return request.get('/api/article/list',{params});
}