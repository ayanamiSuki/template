<template>
  <div class="qrcode-mask">
    <div class="qrcode-wrap">
      <span>添加<span class="manager-name">{{ cmanager_manager_name }}</span>微信，为您提供优质服务！</span>

      <img src="https://test.uxunbank.com:9443/tpfiles/uxunimage//1005813763036495/4578c02db7ee4209a42c231ba0900eb0.jpg"
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
  props: ['cmanager_manager_name'],
  methods: {
    close () {
      this.$emit('closeIcon', null);
    }
  }
};
</script>
