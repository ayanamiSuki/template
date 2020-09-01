<template>
  <div id="app">
    <header-tpl></header-tpl>
    <main-tpl></main-tpl>
  </div>
</template>

<script>
import headerTpl from "./components/header.vue"
import mainTpl from "./components/main.vue"

export default {
  name: "App",
  components: {
    headerTpl, mainTpl,
  },
}
</script>

<style></style>
