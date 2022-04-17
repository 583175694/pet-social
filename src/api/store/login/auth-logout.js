/**
 * @desc 注销
 */
import http from '../../../utils/axios/http';
import { removeAuthorization } from '../../../utils/storage';

export async function authLogout() {
  await removeAuthorization();
  return http.request({ method: 'delete', url: '/user/logut' });
}
