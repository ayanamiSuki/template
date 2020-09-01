// import {UX_CONFIG} from '../config/index_dev'
class Verify {
  constructor() {}
  isIDcard(card) {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card) === false) {
      mui.toast("身份证输入不合法");
      return false;
    }
    return true;
  }
  checkPhone(phone) {
    if (!/^1[3456789]\d{9}$/.test(phone)) {
      mui.toast("手机号码有误，请重填");
      return false;
    }
    return true;
  }
  isNull(...str) {
    let check = true;
    for (let i of str) {
      let regu = "^[ ]+$";
      let re = new RegExp(regu);
      if (str == "" || re.test(i)) {
        mui.toast("必填项不能为空");
        check = false;
      }
    }
    return check;
  }
}

export {
  Verify
}