// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //是否在热映
        isHot: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const that = this;
        //获取正在热映首页数据
        wx.request({
            url: 'https://m.maoyan.com/ajax/movieOnInfoList?token=',
            header: {
                'content-type': 'application/json'
            },
            success({data}) {
                console.log(data);
                data.movieList.forEach(item => {
                    let img = item.img.split('w.h');
                    item.img = img[0] + '120.180' + img[1]; 
                });
                that.setData({
                    hotMovie: {
                        movieIds: data.movieIds,
                        movieList: data.movieList, 
                        total: data.total
                    }
                })
                getApp().globalData.hotMovie = that.data.hotMovie;
            }
        })
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
        console.log(11);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        // if (res.from === 'button') {
        //     // 来自页面内转发按钮
        //     console.log(res.target)
        // } else {
        //     console.log(res.target)
        // }
        // return {
        //     title: '自定义转发标题',
        //     path: '/page/user?id=123'
        // }
    },

    /**
     * 页面滚动事件
     */
    onPageScroll: function (obj) {
        // console.log(obj);
    },

    /**
     * 页面下拉刷新事件
     */
    onPullDownRefresh() {
        console.log('刷新！！！');
    },

    /**
     * 页面上拉事件
     */
    onReachBottom() {
        if (!this.data.isHot) {
            const pageIndex = getApp().globalData.hotPageIndex++
            console.log('上拉！！！' + getApp().globalData.hotPageIndex);  
        } else {
            const pageIndex = getApp().globalData.comingPageIndex++;
            console.log('上拉！！！' + getApp().globalData.comingPageIndex); 
        }
    },

    onTabItemTap(item) {
        // console.log(item.index)
        // console.log(item.pagePath)
        // console.log(item.text)
    },

    //热映
    hotFun() {
        if (this.data.isHot) {
            this.setData({
                isHot: false
            }) 
        }
    },

    //待映
    comingFun() {
        const that = this;
        if (!that.data.isHot) {
            that.setData({
                isHot: true
            })
            //获取待映列表
            wx.request({
                url: 'https://m.maoyan.com/ajax/comingList?ci=59&token=&limit=10',
                header: {
                    'content-type': 'application/json'
                },
                success({data}) {
                    console.log(data);
                    data.coming.forEach(item => {
                        let img = item.img.split('w.h');
                        item.img = img[0] + '120.180' + img[1]; 
                    });
                    that.setData({
                        comingMovie: {
                            coming: data.coming,
                            movieIds: data.movieIds
                        }
                    })
                    getApp().globalData.comingMovie = that.data.comingMovie;
                }
            })
            //获取最受期待列表
            // http://m.maoyan.com/ajax/mostExpected?ci=59&limit=10&offset=0&token=  
            wx.request({
                url: 'https://m.maoyan.com/ajax/mostExpected?ci=59&limit=10&offset=0&token=',
                header: {
                    'content-type': 'application/json'
                },
                success({data}) {
                    console.log(data);
                    data.coming.forEach(item => {
                        let img = item.img.split('w.h');
                        item.img = img[0] + '170.230' + img[1]; 
                    });
                    that.setData({
                        mostExpected: {
                            coming: data.coming,
                            paging: data.paging
                        }
                    })
                    getApp().globalData.mostExpected = that.data.mostExpected;
                }
            })
        }
    },

    //获取更多
    getMoreMovie() {
        const that = this;
        wx.request({
            url: 'http://m.maoyan.com/ajax/moreComingList?token=&movieIds=',
            header: {
                'content-type': 'application/json'
            },
            success({data}) {
                console.log(data);
                data.movieList.forEach(item => {
                    let img = item.img.split('w.h');
                    item.img = img[0] + '120.180' + img[1]; 
                });
                that.setData({
                    hotMovie: {
                        movieIds: data.movieIds,
                        movieList: data.movieList, 
                        total: data.total
                    }
                })
            }
        })
    }
    
})