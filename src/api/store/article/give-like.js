import http from '../../../utils/axios/http';

export function giveLike(articleId) {
  return http.request({
    method: 'put',
    url: '/article/like',
    data: {
      articleId,
    },
  });
}
