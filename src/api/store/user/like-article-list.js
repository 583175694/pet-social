/**
 * @desc 获取用户信息
 */
import http from '../../../utils/axios/http';

export function getLikeArticleList({ account, pageNum, pageSize }) {
  return http.request({
    method: 'post',
    url: '/user/query/likeArticleList',
    data: {
      account,
      pageNum,
      pageSize,
    },
  });
}
