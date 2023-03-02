// pages/userlogin/userlogin.js
const app = getApp()

const db = wx.cloud.database()
const User = db.collection('User')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhanghao:'',
    mima:'',
  },
async login(){
  let result = await wx.cloud.callFunction({
    name: 'getUserinfo',
    data:{
     zhanghao: this.data.zhanghao,
     mima:this.data.mima,
     f:'denglu'
    }
  })
 console.log(result.result.r)
 if(result.result.r===200){
   wx.showToast({
     title: '登陆成功',
     icon:'loading'
   });
   wx.switchTab({
    url: '/pages/index/index',
  })
     
    
 }else{
   wx.showToast({
     title: '账号或者密码错误',
     icon:'error'
   })
 }

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})