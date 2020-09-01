import Vue from "vue";
import App from "./App.vue";
import {
  Dialog
} from 'vant';
import {
  instance
} from './plugin/axios'
Vue.prototype.$http = instance;
Vue.config.productionTip = false;
//百度统计
var _hmt = _hmt || [];
var hm = document.createElement("script");
hm.src = "https://hm.baidu.com/hm.js?20ecb576bd9164fd06cd13f3781e10c3";
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(hm, s);
// 全局注册
Vue.use(Dialog);

new Vue({
  render: h => h(App)
}).$mount("#app");