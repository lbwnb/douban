var subjectsUtil = require("../../utils/subjectsUtil.js");
Page({
  data: {
    ndicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    imgUrls: [
      "/pages/assets/img/p1.jpg",
      "/pages/assets/img/p2.jpg",
      "/pages/assets/img/p3.jpg",
    ],
    movies: [],
    loadingHidden: false
  },
  onLoad: function (options) {
    this.loadMovie();
  },
  loadMovie() {
    var page = this;
    wx.request({
      url: "https://amlb9xta.qcloud.la/v2/movie/in_theaters",
      header: {
        'Content-Type': 'json'
      },
      data: { count: 50 },
      success: function (res) {
        var subjects = res.data.subjects;
        subjectsUtil.processSubjects(subjects);
        page.setData({ "movies": subjects, "loadingHidden": true });
      }
    });
  }
})