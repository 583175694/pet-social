/**
 * @desc 注册
 */
import http from '../../../utils/axios/http';
import { randomString } from '../../../utils/random-string';

export function authRegister(data) {
  return http.request({ method: 'post', url: '/user/register', data: { name: randomString(8), ...data } });
}
