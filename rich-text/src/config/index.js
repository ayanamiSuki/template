const prod_build = {
  // 生产
  HOST: 'https://www.uxunmall.com',
  APPID: 'wx017d7f9c24356694',
  WORK_URL: 'https://sp.uxunchina.cn/html/10063/view/information.html?d=',
  TEMPLATE_URL: 'https://www.uxunmall.com',
  IMAGE_URL: 'https://cdn.uxunmall.com/uxunimg2/cm/',
  reqHeaders: {
    channel: '100',
    subChannel: '0001',
    h5Version: '2.0.0',
    appVersion: '2.0.0',
  },
}

const dev_build = {
  //测试
  HOST: 'https://test.jifenyi.com:9888/',
  APPID: 'wxe508ec3ea53f1ef2',
  WORK_URL: 'https://test.uxunbank.com:9443/html/shareplat/view/information.html?d=',
  TEMPLATE_URL: 'https://test.jifenyi.com:9888/',
  IMAGE_URL: 'https://test.uxunbank.com:9443/tpfiles/uxunimage/',
  reqHeaders: {
    channel: '100',
    subChannel: '0001',
    h5Version: '1.0.0',
    appVersion: '1.0.0',
  },
}
let UX_CONFIG = process.env.NODE_ENV === 'prod_build' ? prod_build : dev_build;
if (process.env.NODE_ENV !== 'prod_build' && process.env.NODE_ENV !== 'dev_build') {
  UX_CONFIG.HOST = '';
}
export {
  UX_CONFIG
};