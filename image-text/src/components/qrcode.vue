<template>
  <div class="qrcode-mask">
    <div class="qrcode-wrap">
      <span>添加<span class="manager-name">{{ cmanager_manager_name }}</span>微信，为您提供优质服务！</span>

      <img :src="wxQRcode"
           id="qr_image"
           alt="" />
      <p class="qr-info">长按识别二维码</p>
      <a href="javascript:;"
         @click="close"
         class="iconfont icon-guanbi1 close-icon"></a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cmanager_manager_name", "wxQRcode"],
  methods: {
    close () {
      this.$emit("closeIcon", null);
    },
  },
};
</script>
