import http from '../../../utils/axios/http';

export function getArticleCommits(id, pageNum, pageSize) {
  return http.request({
    method: 'post',
    url: '/article/query/commentList',
    data: { articleId: id, pageNum, pageSize },
  });
}
