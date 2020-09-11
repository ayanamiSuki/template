<template>
  <div class="main-coponents">
    <div class="bg"
         v-if="A05">
      <img v-for="(item, index) in A05"
           :src="item.linkImage"
           :key="index + 'A05'"
           alt="bg" />
    </div>
  </div>
</template>

<script>
import { Plugin } from "../plugin/index";
import bus from "../plugin/bus";
export default {
  data () {
    return {
      // A01: [],
      // A02: [],
      // A03: [],
      // A04: [],
      A05: [],
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
  .container {
    top: -1.5rem;
  }
  .a3-se {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 48%;
    box-sizing: border-box;
    background-color: #fff;
    padding: 0.2rem;
    border-radius: 0.1rem;
    .text-se {
      width: 100%;
    }

    img {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
}
</style>
