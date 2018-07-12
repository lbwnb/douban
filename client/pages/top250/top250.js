var subjectsUtil = require("../../utils/subjectsUtil.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMovie();
  },
  loadMovie() {
    var page = this;
    wx.request({
      url: 'https://amlb9xta.qcloud.la/v2/movie/top250',
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        var subjects = res.data.subjects;
        subjectsUtil.processSubjects(subjects);
        page.setData({ movies: subjects, loadingHidden: true });
      }
    });
  }
})