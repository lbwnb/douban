var subjectsUtil = require("../../utils/subjectsUtil.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    inputVal: "",
    loadingHidden: true,
    modalHidden: true,
    tip: ""
  },
  bindKeyInput(event) {
    this.setData({ inputVal: event.detail.value });
  },

  search() {
    var page = this;
    var queryStr = page.data.inputVal;
    if (queryStr == "") {
      this.setData({ "tip": "输入的内容不能为空" });
      this.setData({ "modalHidden": false });
    } else {
      page.setData({ loadingHidden: false });
      wx.request({
        url: 'https://amlb9xta.qcloud.la/v2/movie/search?q=' + queryStr,
        header: {
          "Content-Type": "json"
        },
        data: { count: 50 },
        success: function (res) {
          var subjects = res.data.subjects;
          page.setData({ inputVal: res.data.title + ",共" + res.data.total + "条记录" });
          subjectsUtil.processSubjects(subjects);
          page.setData({ "movies": subjects, "loadingHidden": true });
        }
      })
    }
  },

  modalChange() {
    this.setData({ "modalHiddent": true });
  }
})