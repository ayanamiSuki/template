export default {
  wx(wx, self, UX_CONFIG, info) {
    wx.config({
      debug: false,
      appId: UX_CONFIG.APPID, // 必填，公众号的唯一标识
      timestamp: info.timestamp, // '1576154282', //必填，生成签名的时间戳
      nonceStr: info.noncestr, // 'JMv4Bk9bcbrJYLzd', //必填，生成签名的随机串
      signature: info.signature, // 'ecd034836996db5af87e1f993221515b16da2daf', //必填，签名
      jsApiList: [
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "onMenuShareQQ",
        "onMenuShareQZone",
      ], // 必填，需要使用的JS接口列表
    });
    wx.ready(function() {
      console.log("wx.ready");
      var shareTitlex = "";
      var shareDescx = self.personalSign || "";
      var shareImgUrl = self.workphoto;
      if (self.actShareRsp) {
        var rep = self.actShareRsp;
        if (rep.shareTitle) {
          shareTitlex = rep.shareTitle;
          document.title = rep.shareTitle;
        }
        if (rep.shareDesc) {
          shareDescx = rep.shareDesc;
        }
        if (rep.shareIcon) {
          shareImgUrl = rep.shareIcon;
        }
      }
      let shareData = {
        title: shareTitlex,
        desc: shareDescx,
        link: location.href,
        imgUrl: shareImgUrl,
        success: function() {
          setTimeout(function() {
            self.ajaxSendparam("share", self.thisShareDataMap);
          }, 1000);
        },
        cancel: function() {
          alert("分享失败，请咨询技术人员");
        },
      };
      wx.onMenuShareTimeline(shareData);
      wx.onMenuShareAppMessage(shareData);
      wx.onMenuShareQQ(shareData);
      wx.onMenuShareQZone(shareData);
    });
  },
};
