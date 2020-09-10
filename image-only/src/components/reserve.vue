<template>
  <div class="mask-wrap">
    <div class="ux-pop ux-pop-reserve active"
         id="js_reservePop">
      <a href="javascript:;"
         @click="close"
         class="iconfont icon-guanbi1 close-icon"></a>
      <div class="title">预约</div>
      <form class="content"
            id="js_inputItem"
            v-if="formData && !isSend"
            v-html="formData"></form>
      <div class="input-outer"
           id="js_foot"
           v-if="!isSend">
        <a href="javascript:;"
           class="btn"
           id="js_goShare"
           style="text-align: center;margin-bottom: 10px;"
           @click="sub">马上预约
        </a>
      </div>

      <div class="content"
           id="js_successTips"
           v-if="isSend">
        <div class="tips-outer">
          <i class="iconfont icon-chenggong"></i>
          <h3>预约成功</h3>
          <p>1-3个工作日内客户经理会联系您</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Verify } from "./../plugin/verify";
export default {
  props: ["isSend", "reserveData"],
  data () {
    return {
      formData: "",
      verify: "",
    };
  },
  mounted () {
    this.renderShareForm(JSON.parse(this.reserveData));
    this.verify = new Verify();
  },
  methods: {
    close () {
      this.$emit("closeIconreserve", null);
    },
    renderShareForm (ori_arr) {
      let arr = this.resetArr(ori_arr);
      let formComponent = "";
      arr.forEach((item) => {
        if (item.formElementsType == "INPUT_TEXT") {
          formComponent += INPUT_TEXT(item);
        } else if (item.formElementsType == "INPUT_RADIO") {
          formComponent += INPUT_RADIO(item);
        } else if (item.formElementsType == "INPUT_HIDDEN") {
          formComponent += INPUT_HIDDEN(item);
        } else if (item.formElementsType == "INPUT_CHECKBOX") {
          formComponent += INPUT_CHECKBOX(item);
        } else {
          this.$dialog({
            title: "缺少必要的表单组件：" + item.formElementsType,
          });
        }
        // console.log(formComponent);
      });
      this.formData = formComponent;
      function INPUT_TEXT (data) {
        let dom = "";
        if (data.child && data.child.length !== 0) {
          //radio or checkbox
          dom = `<div class="input-outer">
          <span class="isrequired">${data.elementsName}</span>
          <input
            type="hidden"
            placeholder="请填写${data.elementsName}"
            maxlength="30"
            id="${data.elementsDomName}"
            name="${data.elementsDomName}"
          />
          <div class="INPUT_CHECKBOX_ITEM_WRAP">`;
          for (let i of data.child) {
            dom += INPUT_CHECKBOX_ITEM(i, data.defaultValue);
          }
          dom += '</div></div>';
          return dom;
        } else {
          //input
          dom = `<div class="input-outer">
          <span class="isrequired">${data.elementsName}</span>
          <input
            type="text"
            placeholder="请填写${data.elementsName}"
            maxlength="30"
            id="${data.elementsDomName}"
            name="${data.elementsDomName}"
          /></div>`;
        }
        return dom;
      }
      function INPUT_HIDDEN (data) {
        let dom = `<div class="input-outer" style="display:none;">
          <span class="isrequired">${data.elementsName}</span>
          <input
            type="hidden"
            placeholder="请填写${data.elementsName}"
            maxlength="30"
            id="${data.elementsDomName}"
            name="${data.elementsDomName}"
          />
        </div>`;
        return dom;
      }
      function INPUT_RADIO (data) {
        let dom = `<div class="input-outer radio-item ${data.elementsDomName}" default="${data.defaultValue}">
              <span class="isrequired">${data.elementsName}</span>
               <input
                type="hidden"
                placeholder="请填写${data.elementsName}"
                maxlength="30"
                id="${data.elementsDomName}"
                name="${data.elementsDomName}"
               />
               <div class="INPUT_RADIO_WRAP">`;
        for (let i of data.child) {
          dom += INPUT_RADIO_ITEM(i, data.defaultValue);
        }
        dom += '</div></div>';
        return dom;
      }
      function INPUT_RADIO_ITEM (data, defaultValue) {
        let checked = defaultValue === data.defaultValue ? 'checked' : "";
        let dom = `<label>
              <input class="iradio_flat-green" type="radio" ${checked}  name="${data.elementsDomName}" value="${data.defaultValue}">
              ${data.elementsName}
          </label>`;
        return dom;
      }
      function INPUT_CHECKBOX (data) {
        let dom = `<div class="input-outer radio-item ${data.elementsDomName}" default="${data.defaultValue}">
          <span class="isrequired">${data.elementsName}</span>`;
        return dom;
      }
      function INPUT_CHECKBOX_ITEM (data, defaultValue) {
        let checked = defaultValue === data.elementsName ? 'checked' : "";
        let dom = `<span class="checkbox-item"><input name="${data.elementsDomName}_item" value="${data.elementsName}" ${checked} type="checkbox"><label>${data.elementsName}</label></span>`;
        return dom;
      }
    },
    resetArr (arr) {
      let newArr = [];
      for (let i of arr) {
        if (newArr.length === 0) {
          newArr.push(i);
        } else {
          if (i.formElementsType === 'INPUT_CHECKBOX_ITEM' || i.formElementsType === 'INPUT_RADIO_ITEM') {
            for (let j = 0; j < newArr.length; j++) {
              if (newArr[j].elementsDomName === i.elementsDomName) {
                newArr[j].parentElement = i.formElementsType;
                if (arr[j].child) {
                  newArr[j].child.push(i);
                } else {
                  newArr[j].child = [];
                  newArr[j].child.push(i);
                }
              }
            }
          } else {
            newArr.push(i);
          }
        }
      }
      console.log(newArr);
      return newArr;
    },
    sub () {
      if (document.querySelector('.INPUT_CHECKBOX_ITEM_WRAP')) {
        let checkArrData = '';
        let checkArr = document.querySelector('.INPUT_CHECKBOX_ITEM_WRAP').querySelectorAll('input');

        if (checkArr.length) {
          for (let i of checkArr) {
            if (i.checked) {
              checkArrData += i.value + ';';
            }
          }
        }
        document.getElementById('listMedium').value = checkArrData;
      }

      let isPass = true;
      let formData = new FormData(document.getElementById("js_inputItem"));
      let obj = {};
      formData.forEach((v, k) => {
        obj[k] = v;
        if (!this.verify.formVerify(k, v)) {
          isPass = false;
        }
      });
      if (isPass) {
        this.$emit("subSend", obj);
      }
    },
  },
};
</script>

<style></style>
