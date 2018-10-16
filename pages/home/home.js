// pages/default/default.js
import globalData from '../../utils/citydata.js';
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
    ],
    province: '',
    provincecode: '',
    city: '',
    citycode: '',
    district: '',
    districtcode: '',
    curCity: '定位失败'
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    //获取当前位置坐标
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          coord_type: 3,
          success: function(addressRes) {
            var address = addressRes.result.ad_info;
            that.setData({
              province: address.province,
              province: address.provincecode,
              city: address.city,
              citycode: address.city_code,
              district: address.district,
              districtcode: address.adcode,
            })

          },
          fail: function(addressRes) {
            console.log(addressRes);
          },
          complete: function() {
            that.setData({
              curCity: globalData.data.curCityName == null ? that.data.city.replace('市', '') : globalData.data.curCityName
            })
          }
        })
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

  /**
   * 选择地区
   */
  changeCity: function() {
    wx.navigateTo({
      url: '../city/city',
    })
  },
  /**
   * 预约详情
   */
  goOrder: function () {
    wx.navigateTo({
      url: '../order/order',
    })
  }
})