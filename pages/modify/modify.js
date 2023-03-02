// pages/modefy/modify.js

const db = wx.cloud.database()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    mima:'',
    queren:''
  },

 async modify(){
  let data = {
    mima:this.data.mima,
    id: wx.getStorageSync('currentUser')._openid

  };
  let  result  = await wx.cloud.callFunction({
    name: 'modifyUser',
    data
  })
  console.log(result.result.res.data[0].mima)
  if(this.data.mima===result.result.res.data[0].mima){
    wx.showToast({
      title: '与初始密码相同',
      icon:'error'
    })
    return
  }
  if(result.result.result.stats.updated===1){
    wx.showToast({
      title: '密码修改成功',
      icon:'success'
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