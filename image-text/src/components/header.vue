<template>
  <div class="container"></div>
</template>

<script>
import { Plugin } from "./../plugin/index"
export default {
  data () {
    return {
      uxPlugin: "",
      paramsObj: "",
    }
  },
  mounted () {
    this.uxPlugin = new Plugin()
    this.getCurrentFp()
  },
  methods: {
    //获取fp
    getCurrentFp () {
      this.uxPlugin.fp((res) => {
        if (res) {
          console.log(res)
          //获取fp后开始
          this.currentFp = res
          //获取json数据
          this.getParams()
        }
      })
    }, //获取url数据
    getParams () {
      this.paramsObj = this.uxPlugin.evalParams()
      if (this.paramsObj.d) {
        this.ajaxGetShareById(this.paramsObj.actid, this.paramsObj.d)
        return true
      } else {
        this.$dialog.alert({
          message: "url获取数据失败",
        })
        return false
      }
    },
    async ajaxGetShareById (actid, shareId) {
      console.log(shareId);
      let res = await this.$http.post("shareplat/share/getShareById", {
        shareType: "activityId_" + actid,
      })
      console.log(res)
      this.getData();
    },
    async getData () {
      let res = await this.$http.get("act/actManage/queryActiveDetail", {
        pageId: '6bca35b8f5d54409b8d4daec333a8bb4'
      });
      console.log(res);
    }
  },
  computed: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
