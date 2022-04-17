/*
 * @Author: kyroswu
 * @Date: 2022-04-17 11:35:12
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-04-17 15:57:48
 */

import axios from 'axios';
import { addPending, removePending } from './axios.pending';
import { baseURL } from '../../api/base/index';
import { getAuthorization } from '../storage';

/**
 * @description 拦截器
 * @class Interceptors
 */
export class Interceptors {
  instance;
  constructor() {
    this.instance = axios.create({
      baseURL,
      timeout: 30 * 1000,
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
      },
    });
    this.setupInterceptors();
  }
  // 初始化拦截器
  setupInterceptors() {
    // 请求接口拦截器
    this.instance.interceptors.request.use(
      async (config) => {
        config.headers.Authorization = await getAuthorization();
        removePending(config); // 在请求开始前，对之前的请求做检查取消操作
        addPending(config); // 将当前请求添加到 pending 中
        return config;
      },
      () => {
        // 错误抛到业务代码
        const error = { data: { msg: '网络请求错误，请稍后重试' } };
        return Promise.resolve(error);
      },
    );
    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        removePending(response); // 在请求结束后，移除本次请求
        return response.data;
      },
      (error) => {
        let msg;
        let code = -1;
        if (axios.isCancel(error)) {
          msg = '';
          code = -2;
        } else {
          const { status } = error?.response;
          if (status < 200 || status >= 300) {
            // 处理http错误，抛到业务代码
            msg = '网络请求错误，请稍后重试';
          }
        }
        return Promise.resolve({ msg, code });
      },
    );
  }
  // 返回一下
  getInterceptors() {
    return this.instance;
  }
}
