/**
 * @desc 好友私聊
 */
import http from '../../../utils/axios/http';

export function getUser(account) {
  return http.request({ method: 'get', url: '/user/query', params: { account } });
}
