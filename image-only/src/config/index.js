// let UX_CONFIG_BUILD = {
//   // 生产
//   HOST: 'https://www.uxunmall.com',
//   APPID: 'wx017d7f9c24356694',
//   WORK_URL: 'https://sp.uxunchina.cn/html/10063/view/information.html?d=',
//   IMAGE_URL: 'https://cdn.uxunmall.com/uxunimg2/cm/',
//   reqHeaders: {
//     // BANKCODE: '99995',
//     channel: '100',
//     subChannel: '0001',
//     h5Version: '1.0.0',
//     appVersion: '1.0.0',
//   },
// }


let UX_CONFIG_DEV = {
  //测试
  HOST: 'https://test.jifenyi.com:9888/',
  APPID: 'wxe508ec3ea53f1ef2',
  WORK_URL: 'https://test.uxunbank.com:9443/html/shareplat/view/information.html?d=',
  TEMPLATE_URL: 'https://test.jifenyi.com:9888/',
  IMAGE_URL: 'https://test.uxunbank.com:9443/tpfiles/uxunimage/',
  reqHeaders: {
    // BANKCODE: '99995',
    channel: '100',
    subChannel: '0001',
    h5Version: '0.0.1',
    appVersion: '1.0.0',
  },
}

let UX_CONFIG = UX_CONFIG_DEV;

export {
  UX_CONFIG
};