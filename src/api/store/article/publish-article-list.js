/**
 * @desc 获取用户信息
 */
import http from '../../../utils/axios/http';

export function getPublishArticleList({ account, pageNum, pageSize }) {
  return http.request({
    method: 'post',
    url: '/user/query/publishArticleList',
    data: {
      account,
      pageNum,
      pageSize,
    },
  });
}
