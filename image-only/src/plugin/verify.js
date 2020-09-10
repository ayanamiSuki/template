// import {UX_CONFIG} from '../config/index_dev'
import Vue from 'vue';
class Verify {
  constructor() {
    this.vue = new Vue();
  }
  dialog(title) {
    this.vue.$dialog({
      title
    })
  }
  // isIDcard(card) {
  //     let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  //     if (reg.test(card) === false) {
  //       mui.toast("身份证输入不合法");
  //       return false;
  //     }
  //     return true;
  //   },
  //   isNull(...str) {
  //     let check = true;
  //     for (let i of str) {
  //       let regu = "^[ ]+$";
  //       let re = new RegExp(regu);
  //       if (str == "" || re.test(i)) {
  //         mui.toast("必填项不能为空");
  //         check = false;
  //       }
  //     }
  //     return check;
  //   },
  formVerify(k, v) {
    if (k === 'tel') {
      if (!/^1[3456789]\d{9}$/.test(v)) {
        this.dialog('联系方式(手机号)有误，请重填');
        return false;
      }
    } else if (k === 'name' || k === 'workAddr' || k === 'remarks' || k === 'money' || k === 'callName' || k === 'count' || k === 'inviteNum') {
      if (v.replace(/ /g, '') == '') {
        this.dialog('必填项不能为空');
        return false;
      }
    } else if (k === 'idNo') {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!reg.test(v)) {
        this.dialog('身份证输入不合法');
        return false;
      }
    }
    return true;
  }
}

export {
  Verify
}