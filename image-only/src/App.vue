<template>
  <div id="app">
    <header-tpl></header-tpl>
    <main-tpl></main-tpl>
  </div>
</template>

<script>
import headerTpl from "./components/header.vue";
import mainTpl from "./components/main.vue";

export default {
  name: "App",
  components: {
    headerTpl,
    mainTpl,
  },
};
</script>

<style>
html {
  font-size: 13.3333333333vw;
}
p {
  font-size: 0.28rem;
  width: 100%;
  word-break: break-all;
}
</style>
