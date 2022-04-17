/**
 * @desc 登录
 */
import http from '../../../utils/axios/http';

export function authLogin(data) {
  return http.request({ method: 'put', url: '/user/login', data });
}
