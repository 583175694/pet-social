import http from '../../../utils/axios/http';

export function getArticleList({ pageNum, pageSize }) {
  return http.request({ method: 'post', url: '/article/query/home', data: { pageNum, pageSize } });
}
