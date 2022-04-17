import http from '../../../utils/axios/http';

export function publishCommit(articleId, content) {
  return http.request({
    method: 'put',
    url: '/article/comment/publish',
    data: {
      articleId,
      content,
    },
  });
}
