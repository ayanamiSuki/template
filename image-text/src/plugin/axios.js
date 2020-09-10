import Vue from 'vue'
import qs from 'qs'
import {
  UX_CONFIG
} from './../config/index'
import axios from 'axios'
let Dialog = new Vue().$dialog;
let contentType = {
  'content-type': 'application/x-www-form-urlencoded'
};
let instance = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? '' : UX_CONFIG.HOST,
  timeout: 10000,
  headers: Object.assign(UX_CONFIG.reqHeaders, contentType)
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.data = qs.stringify(config.data);
  return config;
}, function (error) {
  // 对请求错误做些什么
  Dialog.alert({
    message: error,
  });
  return Promise.reject(error);
});
// 添加响应拦截器
instance.interceptors.response.use(function ({
  status,
  data,
  data: {
    dataMap,
    retCode,
    retShow
  }
}) {
  if (status === 200 && retCode === '0000') {
    if (dataMap) {
      return dataMap;
    } else {
      return data;
    }
  } else {
    Dialog.alert({
      message: retShow || '获取数据失败',
    });
    return '';
  }
}, function (error) {
  // 对响应错误做点什么
  Dialog.alert({
    message: error,
  });
  return Promise.reject(error);
});
export {
  instance
}