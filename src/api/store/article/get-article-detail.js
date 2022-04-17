import http from '../../../utils/axios/http';

export function getArticleDetail(id) {
  return http.request({ method: 'get', url: '/article/query', params: { articleId: id } });
}
