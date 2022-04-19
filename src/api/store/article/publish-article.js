import http from '../../../utils/axios/http';

export function publishArticle(ids, publishContent) {
  return http.request({
    method: 'post',
    url: '/article/publish',
    data: {
      publishBannerFileIdJsonArray: `[${ids}]`,
      publishContent,
    },
  });
}
