// pages/xiaoxi/xiaoxi.js
const db = wx.cloud.database()
const X = db.collection('XiaoXi')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    xi:null,
xiaoxi:'有人评论了你的帖子',
xiaoxi1:'有人点赞了你的帖子',
xiaoxi2:'有人收藏了你的帖子'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.xiaoxi()
  },
async xiaoxi(){
  let  {result}  = await wx.cloud.callFunction({
    name: 'xiaoxi',
   
  })
  console.log(result)

  if(result.result.data[0].pinlun===1){
      this.setData({
        xi:this.data.xiaoxi
      })
      console.log(this.data.xi)
  }
  X.doc(result.result.data[0]._id).update({data:{pinlun:0}})

  
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