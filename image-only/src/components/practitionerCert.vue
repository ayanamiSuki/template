<template>
  <div class="qrcode-mask2"
       @click="closeMask">
    <div class="practitionerCert-wrap">
      <img src="../assets/images/certificate.jpg"
           alt="" />
      <span class="cer1">{{ certi[0] }}</span>
      <span class="cer2">{{ certi[1] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["certi"],
  methods: {
    closeMask () {
      this.$emit('closeMask', null);
    }
  }
};
</script>
