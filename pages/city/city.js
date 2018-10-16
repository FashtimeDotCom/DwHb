// pages/city/city.js
import cityData from '../../utils/citydata.js';
import globalData from '../../utils/citydata.js';
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cities: [],
    citycode:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'YE6BZ-3OU2X-OCU4G-7D6ZS-BDX6V-PVBOK'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let that=this;
    let storeCity = new Array(2);
    //const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    const words = ["H","Z"]
    words.forEach((item, index) => {
      storeCity[index] = {
        key: item,
        list: []
      }
    })
    cityData.data.forEach((item) => {
      let firstName = item.pinyin.substring(0, 1);
      let index = words.indexOf(firstName);
      storeCity[index].list.push({
        name: item.name,
        key: firstName,
        code:item.citycode
      });
    })
    that.setData({
      cities: storeCity
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    qqmapsdk.getCityList({
      success: function(res) {
      },
      fail: function(res) {
        console.log(res);
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  onChange(event) {

  },
  clickCity: function (e){
    globalData.data.curCityName= e.currentTarget.dataset.name;
    console.log(globalData.data.curCityName);
    this.setData({
      curLocation: e.currentTarget.dataset.id
    })
    wx.navigateTo({
      url: '../home/home',
    })
  }
})