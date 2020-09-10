<template>
  <div class="header-component">
    <div class="jiugongges-btn">
      <nav class="ux-bar ux-tab-bar"
           id="js_bar"
           v-if="manageBar === '2'">
        <div class="info">
          <div class="custInfo dbox bac">
            <img :src="workphoto"
                 id="js_slt" />
            <div class="bf1">
              <h3 id="js_cmInfo">{{ cmanager_manager_name }}</h3>
              <p id="js_address"
                 class="mui-tab-label mui-ellipsis-2">
                {{ cmanager_instName }}
              </p>
            </div>
          </div>
        </div>
        <div class="nav-handle">
          <li class="tab-item"
              id="js_work"
              @click="toPersonalWork">
            <span class="iconfont icon-gongzuoshi"></span>
            <span class="mui-tab-label">工作室</span>
          </li>
          <li class="tab-item"
              id="js_call"
              :call="cmanager_phone_no"
              @click="callTel">
            <span class="iconfont icon-shouji"></span>
            <span class="mui-tab-label">电话联系</span>
          </li>
          <li class="tab-item "
              id="js_showQRCode"
              :class="!wxQRcode && 'disabled'"
              @click="showQRcode = true">
            <span class="iconfont icon-weixin"></span>
            <span class="mui-tab-label">微信联系</span>
          </li>
          <li class="tab-item"
              id="js_reserve"
              v-if="reserve"
              @click="ShowReserve = true">
            <span class="iconfont icon-yuyue"></span>
            <span class="mui-tab-label">预约</span>
          </li>
        </div>
      </nav>
    </div>
    <div class="jiugongges-btn">
      <nav id="js_bar2"
           v-if="manageBar === '1'">
        <div class="rt-top-info">{{ cmanager_instName }}</div>
        <div class="info">
          <div class="custInfo dbox bac">
            <img :src="workphoto"
                 id="js_slt2" />
          </div>
        </div>
        <div class="nav-handle">
          <div class="bf1"
               style="text-align: left;">
            <h3 id="js_cmInfo2">
              <span class="name">{{ cmanager_manager_name }}</span><span class="no">{{ cmanager_employee_no }}</span>
            </h3>
            <p id="js_address2"
               class="mui-tab-label mui-ellipsis-2">
              {{ personalSign }}
            </p>
          </div>
          <div class="js2x">
            <li class="tab-item"
                id="js_work2"
                :class="!certi && 'disabled'"
                @click="showCerti=true">
              <i class="iconfont  icon-yuminzhengshu"></i>
              <span class="mui-tab-label">看证书</span>
            </li>
            <li class="tab-item"
                id="js_call2"
                :call="cmanager_phone_no"
                @click="callTel">
              <span class="iconfont icon-shouji"></span>
              <span class="mui-tab-label">电话联系</span>
            </li>
            <li class="tab-item"
                id="js_showQRCode2"
                :class="!wxQRcode && 'disabled'"
                @click="showQRcode = true">
              <span class="iconfont icon-weixin"></span>
              <span class="mui-tab-label">微信联系</span>
            </li>
          </div>
        </div>
      </nav>
    </div>
    <transition name="fade">
      <!-- 预约 -->
      <reserve v-if="ShowReserve"
               @closeIconreserve="ShowReserve = false"
               @subSend="subSendparam"
               :showForm="showForm"
               :isSend="isSend"
               :reserveData="reserveData"></reserve>
      <!-- ./ -->
    </transition>
    <transition name="fade">
      <!-- 二维码 -->
      <qrcode v-if="showQRcode"
              @closeIcon="showQRcode = false"
              :cmanager_manager_name="cmanager_manager_name"></qrcode>
      <!-- ./ -->
    </transition>
    <transition name="fade">
      <!-- 证书 -->
      <practitioner-cert :certi="certi"
                         v-if="certi && showCerti"
                         @closeMask="showCerti=false;"></practitioner-cert>
      <!-- ./ -->
    </transition>
  </div>
</template>

<script>
import bus from "../plugin/bus";
import { Plugin } from "./../plugin/index";
import { UX_CONFIG } from "./../config/index";
import wx from "weixin-js-sdk";
import wxconfig from "./../config/wxconfig";
import practitionerCert from "./practitionerCert";
import qrcode from "./qrcode";
import reserve from "./reserve";
export default {
  components: {
    practitionerCert,
    qrcode,
    reserve,
  },
  data () {
    return {
      uxPlugin: "",
      paramsObj: "",
      dataMap: "",
      manageBar: 0,
      reserve: false,
      managerInfo: {},
      workphoto: "https://sp.uxunchina.cn/uxunimg2/middleActivity/actPageImg/202009/db860447-f077-41d0-8eda-cc4d4594a8e6.jpeg",
      wxQRcode: "",
      personalSign: "",
      certi: "",
      isSend: false,
      showForm: false,
      cmanager_manager_name: "",
      cmanager_instName: "",
      cmanager_phone_no: "",
      cmanager_employee_no: "",
      showCerti: false,
      showQRcode: false,
      ShowReserve: false,
      reserveData: "",
      pageId: ''
    };
  },
  mounted () {
    this.uxPlugin = new Plugin();
    this.getCurrentFp();
    // document.querySelector('.ux-bar').style.top =
    //   document.body.clientHeight + "px";
  },
  methods: {
    //获取fp
    getCurrentFp () {
      this.uxPlugin.fp((res) => {
        if (res) {
          //获取fp后开始
          this.currentFp = res;
          //获取json数据
          this.getParams();
        }
      });
    }, //获取url数据
    getParams () {
      this.paramsObj = this.uxPlugin.evalParams();
      if (this.paramsObj.d) {
        // let paramsObj = Object.assign({}, this.paramsObj);
        this.ajaxGetShareById(this.paramsObj.actid, this.paramsObj.d);
        return true;
      } else {
        // this.$dialog.alert({
        //   message: "url获取数据失败",
        // });
        return false;
      }
    },
    //获取分享的信息
    async ajaxGetShareById (actid, shareId) {
      let { actShareRsp, formsTemplate } = await this.$http.post(
        "shareplat/share/getShareById",
        {
          shareType: "activityId_" + actid,
        }
      );
      if (actShareRsp) {
        //客户经理条
        this.pageId = actShareRsp.pageId;
        this.actShareRsp = actShareRsp;
        this.manageBar = actShareRsp.tag01;
        document.title = actShareRsp.shareTitle || '';
      }
      if (formsTemplate) {
        //预约
        this.reserve = true;
        this.reserveData = formsTemplate.dataconfig;
      }
      //获取分享信息
      this.ajaxGetShareInfo(shareId);
    },
    async ajaxGetShareInfo (shareId) {
      let res = await this.$http.post("shareplat/share/getShareInfo", {
        reqContent: JSON.stringify({ shareId }),
        deviceInfo: "",
      });
      this.managerInfo = res;
      this.handleShareInfo(res);
    },
    handleShareInfo (dataMap) {
      this.cmanager_manager_name = dataMap.cmanager_manager_name;
      this.cmanager_instName = dataMap.cmanager_instName;
      this.cmanager_phone_no = dataMap.cmanager_phone_no;
      this.cmanager_employee_no = dataMap.cmanager_employee_no;
      if (dataMap.cmanager_info != "null") {
        let cmanager_info = JSON.parse(dataMap.cmanager_info);
        if (cmanager_info.workphoto) {
          this.workphoto = UX_CONFIG.IMAGE_URL + cmanager_info.workphoto;
        }
        if (cmanager_info.wxQRcode) {
          this.wxQRcode = UX_CONFIG.IMAGE_URL + cmanager_info.wxQRcode;
        }
        if (cmanager_info.personalSign) {
          this.personalSign = cmanager_info.personalSign;
        }
        if (cmanager_info.practitionerCert) {
          this.certi = cmanager_info.practitionerCert.split("-");
        }
      }
      this.ajaxSaveShareInfo(dataMap);
    },
    async ajaxSaveShareInfo (shareDataMap) {
      let paramsObj = this.paramsObj;
      let contentData = {
        bankcode: "99995",
        shareDataMap: shareDataMap,
        shareType: "activityId_" + paramsObj.actid,
      };
      let res = await this.$http.post("shareplat/share/saveShareInfo", {
        reqContent: JSON.stringify(contentData),
        deviceInfo: "",
      });
      if (res) {
        this.ajaxSendparam("open", shareDataMap);
        this.thisShareDataMap = shareDataMap;
        this.setWXSDK(res);
        bus.$emit("setparamsObj", this.paramsObj);
        bus.$emit("setShareDataMap", shareDataMap);
        bus.$emit("setPageId", this.pageId);
      }
    },
    subSendparam (data) {
      this.ajaxSendparam("submmit", this.thisShareDataMap, data);
    },
    async ajaxSendparam (operType, map, subData = {}) {
      let formData = {};
      let paramsObj = this.paramsObj;
      let uxuuid = this.uxPlugin.getuuid();
      //后端写错了，就暂时用着submmit这个错误单词
      if (operType === "submmit") {
        formData = {
          formData: subData,
          operType: operType,
          businessType: "activity_" + paramsObj.actid,
          bankcode: paramsObj.instid,
        };
      } else {
        formData = {
          formData: "",
          operType: operType,
          businessType: "activity_" + paramsObj.actid,
          bankcode: paramsObj.instid,
        };
      }
      let res = this.$http.post(
        "shareplat/user/sendParam",
        {
          reqContent: JSON.stringify(formData),
          deviceInfo: "",
        },
        {
          headers: {
            originalId: map.original_id,
            originalUserId: map.cmanager_id,
            currentId: paramsObj.d,
            currentUserId: map.current_userId,
            operId: uxuuid,
            operUserId: this.currentFp,
            operPhone: map.cmanager_phone_no,
            bankCode: paramsObj.instid,
            instNo: map.cmanager_inst_no,
          },
        }
      );
      if (res && operType == "submmit") {
        this.showForm = false;
        this.isSend = true;
      }
    },
    callTel () {
      location.href = "tel:" + this.cmanager_phone_no;
    },
    toPersonalWork () {
      location.href = UX_CONFIG.WORK_URL + this.paramsObj.d;
    }, //微信sdk
    setWXSDK: function (info) {
      wxconfig.wx(wx, this, UX_CONFIG, info);
    },
  },
  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/css/iconfont.scss";
@import "../assets/css/main.scss";
</style>
