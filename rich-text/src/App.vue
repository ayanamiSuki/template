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
h1 {
  font-size: 0.8rem;
}
h2 {
  font-size: 0.7rem;
}
h3 {
  font-size: 0.6rem;
}
h4 {
  font-size: 0.5rem;
}
h5 {
  font-size: 0.4rem;
}
.rich-text img {
  max-width: 100%;
  padding: 0.2rem 0;
}
</style>
