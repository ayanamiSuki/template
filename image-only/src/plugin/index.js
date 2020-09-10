// import {
//   UX_CONFIG
// } from '../config/index_dev'
import Fingerprint2 from './../assets/js/fp'

class Plugin {
  constructor() {
    this.fp2 = "";
    this.uuid = "";
  }
  getuuid() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    let uuid = s.join("");
    return uuid;
  }
  request() {
    return;
    // let reqheader = UX_CONFIG.reqHeaders;
    // if (obj.headers) {
    //   reqheader = Object.assign(reqheader, obj.headers);
    // }
    // $.ajax({
    //   url: UX_CONFIG.HOST + "/shareplat/" + obj.url,
    //   //如果是代理测试，使用下面这个url
    //   // url: '/api/' + obj.url,
    //   method: "post",
    //   headers: reqheader,
    //   // async: !Plugin.prototype.isIOS(),
    //   data: obj.data,
    //   success: (data) => {
    //     if (data.retCode === "0000") {
    //       obj.success(data);
    //     } else {
    //       alert(data.retShow);
    //     }
    //   },
    //   error: () => {
    //     alert(obj.url + "请求失败");
    //   },
    // });
  }
  fp(callback) {
    //获取缓存里面的fp，否则新建一个
    let oldfp = localStorage.getItem("ux_fp");
    if (oldfp) {
      callback(oldfp);
      return;
    }
    let fp = new Fingerprint2();
    fp.get(function (result) {
      if (result) {
        callback(result);
        localStorage.setItem("ux_fp", result);
      }
    });
  }
  evalParams() {
    let params = location.href.substr(location.href.indexOf("?") + 1);
    let arr1 = params.split("&");
    let obj = {};
    arr1.forEach(function (item) {
      let arr2 = item.split("=");
      obj[arr2[0]] = arr2[1];
    });
    return obj;
  }
  isIOS() {
    let u = navigator.userAgent;
    //let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isiOS;
  }
  backTop() {
    let scrollToptimer = setInterval(() => {
      let top = document.body.scrollTop || document.documentElement.scrollTop;
      let speed = top / 4;
      if (document.body.scrollTop != 0) {
        document.body.scrollTop -= speed;
      } else {
        document.documentElement.scrollTop -= speed;
      }
      if (top == 0) {
        clearInterval(scrollToptimer);
      }
    }, 15);
  }
}
export {
  Plugin
}