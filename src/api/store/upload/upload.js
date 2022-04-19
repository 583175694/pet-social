import { getAuthorization } from '../../../utils/storage';
import { baseURL } from '../../base';

export async function upload(formData) {
  return new Promise(async (resolve, reject) => {
    return fetch(`${baseURL}/upload/file`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: await getAuthorization(),
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((ret) => {
        resolve(ret); // 得到的uri（http格式）拿到后进行操作吧
      })
      .catch((error) => {
        reject('error', error);
      });
  });
}
