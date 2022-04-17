import http from '../../../utils/axios/http';

export function getArticleLikes(id) {
  return http.request({
    method: 'post',
    url: '/article/query/likeUserList',
    data: { articleId: id, pageNum: 1, pageSize: 4 },
  });
}
