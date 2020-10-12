<template>
  <div class="main-coponents">
    <div class="banner"
         v-if="A01">
      <img v-for="(item, index) in A01"
           :src="item.linkImage"
           :key="index + 'A01'"
           alt="bg" />
    </div>
    <div class="rich-text"
         v-if="A02">
      <div v-for="(item,index) in A02"
           :key="index+'A02'">
        <div v-html="item.tag01"
             class="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Plugin } from "../plugin/index";
import bus from "../plugin/bus";
export default {
  data () {
    return {
      A01: [],
      A02: [],
      // A03: [],
      // A04: [],
      // A05: [],
      managerMap: {},
      paramsObj: {},
      pageId: ''
    };
  },
  mounted () {

    if (!this.pageId) {
      let urlJSON = new Plugin().evalParams();
      if (urlJSON && urlJSON.pageId) {
        this.pageId = urlJSON.pageId;
        this.getData();
      }
    }

    bus.$on("setPageId", (res) => {
      this.pageId = res;
      this.getData();
    });
    bus.$on("setparamsObj", (res) => {
      this.paramsObj = res;
    });
    bus.$on("setShareDataMap", (res) => {
      this.managerMap = res;
    });

  },
  methods: {
    async getData () {

      let res = await this.$http.get(
        "mplat/act/actManage/queryActiveDetail?pageId=" + this.pageId
      );
      for (let i of res.areaItems) {
        this[i.areaId] = i.actTemplateItems;
      }
    },
    renderTag (tag06) {
      let tag06Arr = tag06.split("@#@");
      let html = "";
      for (let i of tag06Arr) {
        let paragraph = '<p class="tag06-item">' + i + "</p>";
        html += paragraph;
      }
      return html;
    },
    backTop () {
      return new Plugin().backTop();
    },
    toActiveDetail (item) {
      let managerMap = this.managerMap;
      let url = item.linkHref,
        outno = item.tag04,
        prono = item.tag05,
        params = item.tag03;
      let concatParams =
        "outNo=" + outno + "&proNo=" + prono + "&params=" + params;
      if (url == "") {
        return this.$dialog({ message: "获取商品url失败" });
      }
      if (managerMap.cmanager_inst_no && managerMap.cmanager_id) {
        concatParams +=
          "&cmanager_inst_no=" +
          managerMap.cmanager_inst_no +
          "&cmanager_id=" +
          managerMap.cmanager_id +
          "&EMPLOYEE_NO=" +
          managerMap.cmanager_employee_no +
          "&Hno=" +
          this.paramsObj.actid +
          "&Cno=" +
          managerMap.cmanager_employee_no +
          "&actid=" +
          this.paramsObj.actid;
      }
      let otherParams =
        url.indexOf("?") != -1 ? "&" + concatParams : "?" + concatParams;
      // console.log(url + otherParams)
      location.href = url + otherParams;
    },
  },
};
</script>
<style lang="scss" scoped>
.main-coponents {
  // padding-bottom: 2rem;
  .content {
    width: 100vw;
    box-sizing: border-box;
    padding: 0.2rem;
    overflow: hidden;
    color: #595959;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
  }
  .rich-text {
    padding-bottom: 2rem;
  }
}
</style>
