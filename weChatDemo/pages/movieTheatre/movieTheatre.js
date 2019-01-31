// pages/movieTheatre.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theatreList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let cityId = this.globalData.cityId;
    this.getTheatreList(151);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  
  //获取影院列表
  getTheatreList (cityId) {
    let that = this;
    wx.request({
      url: `http://m.maoyan.com/ajax/cinemaList?day=2019-01-30&offset=0&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1548831570902&cityId=${cityId}`,
      header: {
          'content-type': 'application/json'
      },
      success({data}) {
          let theatreList = data.cinemas;
          that.setData({
            theatreList
          });
          // wx.setStorage({
          //   key: 'cityList',
          //   data: JSON.stringify(cityObj),
          //   success (res) {
          //     console.log(res);
          //   }
          // });
      }
  })
  },
})