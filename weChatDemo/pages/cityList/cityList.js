// pages/cityList/cityList.js
let amapFile = require('../../lib/js/amap-wx');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityList: {},
    firstLetter: [],
    locationCity: '正在定位',
    toCity: '',
    pageStartY: '',
    pageMoveY: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'cityList',
      success (res) {
        let data = JSON.parse(res.data)
        that.setData({
          cityList: data.cityObj,
          firstLetter: data.firstLetter
        });
      },
      fail (res) {
        console.log(res);
        that.getCityList();
      }
    });
    that.getLocationCity();
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
  //获取当前位置
  getLocationCity(){
    let myAmapFun = new amapFile.AMapWX({key:'cfa071b56f93c0e9c2a4c5ea974a9fef'});
    myAmapFun.getRegeo({
      success: (data) => {
        console.log(data[0].regeocodeData.addressComponent.city);
        this.setData({
          locationCity: data[0].regeocodeData.addressComponent.city
        });
      },
      fail: function(info){
        //失败回调
        console.log(info)
      }
    })
  },
  //获取城市列表
  getCityList () {
    let that = this;
    wx.request({
      url: 'https://m.maoyan.com/dianying/cities.json',
      header: {
          'content-type': 'application/json'
      },
      success({data}) {
          let cityObj = that.sortCity(data.cts);
          that.setData({
            cityList: cityObj.cityObj,
            firstLetter: cityObj.firstLetter
          });
          wx.setStorage({
            key: 'cityList',
            data: JSON.stringify(cityObj),
            success (res) {
              console.log(res);
            }
          });
      }
  })
  },
  //城市排序
  sortCity(cityList) {
    let cityObj = {
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      F: [],
      G: [],
      H: [],
      I: [],
      J: [],
      K: [],
      L: [],
      M: [],
      N: [],
      O: [],
      P: [],
      Q: [],
      R: [],
      S: [],
      T: [],
      U: [],
      V: [],
      W: [],
      X: [],
      Y: [],
      Z: [],
    };
    let firstLetter = [];
    cityList.forEach(item => {
      cityObj[item.py.split('')[0].toUpperCase()].push(item);
    });
    for (const key in cityObj) {
      if (!cityObj[key].length) {
          delete cityObj[key];
      } else {
        firstLetter.push(key);
      }
    }
    console.log(cityObj);
    return {
      cityObj,
      firstLetter
    };
  },
  // touchStart(e) {
  //   // console.log(e);
  //   this.setData({
  //     pageStartY: e.touches[0].pageY
  //   })
  // },
  // touchMove(e) {
  //   let moveY = e.touches[0].pageY - this.data.pageStartY
  //   this.setData({
  //     pageMoveY: moveY
  //   })
  //   console.log(moveY);
  //   let index = Math.floor(moveY / 5);
  //   let firstLetter = ['定位', '最近', '热门',...this.data.firstLetter]
  //   let city = firstLetter[index];
  //   console.log(city);
  //   this.setData({
  //     toCity: city
  //   })
  // },
  selectItem(e) {
    console.log(e);
    this.setData({
      toCity: e.target.dataset.id
    })
  }
})