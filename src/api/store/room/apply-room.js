/**
 * @desc 申请单人聊天室
 */
import http from '../../../utils/axios/http';

export function applyRoom({ receiverUserId }) {
  return http.request({ method: 'put', url: '/user/chat-single-room/apply', data: { receiverUserId } });
}
