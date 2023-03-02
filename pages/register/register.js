// pages/register/register.js
let app = getApp()

const db = wx.cloud.database()
const User = db.collection('user')


Page({

  /**
   * 页面的初始数据
   */
  data: {
zhanghao:'',
mima:'',
queren:''
  },
async zhuce(){
  if(this.data.mima!==this.data.queren){
    // console.log(1)
    wx.showToast({
      title: '确认密码填写错误',
      icon:'error'
    })
    return
  }
  let result = await wx.cloud.callFunction({
    name: 'getUserinfo',
    data:{
     zhanghao: this.data.zhanghao,
     f:'zhuce'
    }
  })
  // console.log(result.result.status)
  if(result.result.status===400){
    wx.showToast({
      title: '账号已被使用',
      icon:'error'
    })
    return
  }
   await wx.cloud.callFunction({
    name: 'addUser',
    data:{
      zhanghao: this.data.zhanghao,
      mima: this.data.mima
    }
  }).then(()=>{
    wx.showToast({
      title: '注册成功',
    });
    wx.switchTab({
      url:'/pages/index/index',
    })
  })
  

 
  
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