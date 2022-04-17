/*
 * @Author: kyroswu
 * @Date: 2022-04-17 11:34:58
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-04-17 15:35:17
 */

import { Interceptors } from './axios.interceptors';
import { baseURL } from '../../api/base/index';

const GAME_ID = 16300;
const SOURCE = 1;

// 请求配置
export class HttpServer {
  axios;
  // 获取axios实例
  constructor() {
    this.axios = new Interceptors().getInterceptors();
  }
  // 简单封装一下方法
  request(config) {
    return new Promise((resolve, reject) => {
      this.axios(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          err && err?.msg && console.log(err?.msg);
          reject(err);
        });
    });
  }
}
const http = new HttpServer();
export default http;
