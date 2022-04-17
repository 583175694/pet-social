import http from '../../../utils/axios/http';

export function publishArticle(publishContent) {
  return http.request({
    method: 'post',
    url: '/article/publish',
    data: {
      publishBannerFileIdJsonArray: '[]',
      publishContent,
    },
  });
}
