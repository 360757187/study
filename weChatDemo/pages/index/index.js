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
        that.getHotOneMovieList();
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
        let that = this; 
        Object.assign(getApp().globalData, {
            hotPageIndex: 1,
            comingPageIndex: 1,
            pageSize: 10,
            //热映页数据
            hotMovie: {
                movieIds: [],
                movieList: [],
                total: 0,
                loading: true
            },
            //待映
            comingMovie: {
              coming: [],
              movieIds: [],
              loading: true
            },
            //最受期待
            mostExpected: {
              coming: [],
              paging: [],
              loading: true,
              offset: 10
            }
        });
        if (this.data.isHot) {
            this.getComingOneMovieList();  
        } else {
            this.getHotOneMovieList();
        }
        setTimeout(() => {
            wx.stopPullDownRefresh();
        }, 2000)
    },

    /**
     * 页面上拉事件
     */
    onReachBottom() {
        const that = this;
        if (!that.data.isHot) {
            if (getApp().globalData.hotMovie.loading) return;
            const pageSize = getApp().globalData.pageSize;
            const pageIndex = ++getApp().globalData.hotPageIndex;
            const length = getApp().globalData.hotMovie.movieList.length;
            console.log('上拉！！！' + getApp().globalData.hotPageIndex);
            const nextMovieList = getApp().globalData.hotMovie.movieIds.slice(length, pageIndex * pageSize);
            const url = 'https://m.maoyan.com/ajax/moreComingList?token=&movieIds=' + nextMovieList;
            that.getMoreMovie(url, function ({
                coming
            }) {
                coming.forEach(item => {
                    let img = item.img.split('w.h');
                    item.img = img[0] + '120.180' + img[1];
                });
                getApp().globalData.hotMovie.movieList = [...getApp().globalData.hotMovie.movieList, ...coming];
                if (getApp().globalData.hotMovie.movieList.length < getApp().globalData.hotMovie.movieIds.length) {
                    getApp().globalData.hotMovie.loading = false;
                } else {
                    getApp().globalData.hotMovie.loading = true;
                }
                that.setData({
                    hotMovie: {
                        movieList: getApp().globalData.hotMovie.movieList
                    }
                })
            });
        } else {
            if (getApp().globalData.comingMovie.loading) return;
            const pageSize = getApp().globalData.pageSize;
            const pageIndex = ++getApp().globalData.comingPageIndex;
            const length = getApp().globalData.comingMovie.coming.length;
            console.log('上拉！！！' + getApp().globalData.comingPageIndex);
            const nextMovieList = getApp().globalData.comingMovie.movieIds.slice(length, pageIndex * pageSize);
            const url = 'https://m.maoyan.com/ajax/moreComingList?token=&movieIds=' + nextMovieList;
            this.getMoreMovie(url, function ({
                coming
            }) {
                coming.forEach(item => {
                    let img = item.img.split('w.h');
                    item.img = img[0] + '120.180' + img[1];
                });
                getApp().globalData.comingMovie.coming = [...getApp().globalData.comingMovie.coming, ...coming];
                if (getApp().globalData.comingMovie.coming.length < getApp().globalData.comingMovie.movieIds.length) {
                    getApp().globalData.comingMovie.loading = false;
                } else {
                    getApp().globalData.comingMovie.loading = true;
                }
                that.setData({
                    comingMovie: {
                        coming: getApp().globalData.comingMovie.coming
                    }
                })
            });
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
            that.getComingOneMovieList();
        }
    },

    //获取热映首页数据
    getHotOneMovieList() {
        let that = this;
        wx.request({
            url: 'https://m.maoyan.com/ajax/movieOnInfoList?token=',
            header: {
                'content-type': 'application/json'
            },
            success({
                data
            }) {
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
    //获取待映首页数据
    getComingOneMovieList() {
        let that = this;
         //获取待映列表
         wx.request({
            url: 'https://m.maoyan.com/ajax/comingList?ci=59&token=&limit=10',
            header: {
                'content-type': 'application/json'
            },
            success({
                data
            }) {
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
            success({
                data
            }) {
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
    },

    //获取更多
    getMoreMovie(url, cb) {
        const that = this;
        wx.request({
            url,
            header: {
                'content-type': 'application/json'
            },
            success({
                data
            }) {
                cb && cb(data);
            }
        })
    },

    //获取更多最受期待
    scrollRight() {
        let that = this;
        if (getApp().globalData.mostExpected.loading) return;
        getApp().globalData.mostExpected.paging.offset += 10;
        let url = `https://m.maoyan.com/ajax/mostExpected?ci=59&limit=10&offset=${getApp().globalData.mostExpected.paging.offset}&token=`
        console.log(111);
        this.getMoreMovie(url, function (data) {
            data.coming.forEach(item => {
                let img = item.img.split('w.h');
                item.img = img[0] + '170.230' + img[1];
            });
            getApp().globalData.mostExpected.coming = [...getApp().globalData.mostExpected.coming, ...data.coming];
            if (getApp().globalData.mostExpected.coming.length < getApp().globalData.mostExpected.paging.total) {
                getApp().globalData.mostExpected.loading = false;
            } else {
                getApp().globalData.mostExpected.loading = true;
            }
            that.setData({
                mostExpected: {
                    coming: getApp().globalData.mostExpected.coming
                }
            })
        });
    }

})