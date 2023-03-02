

Page({

  
  data: {
    list:null
  },

  
  onLoad() {
    this.getNumber()
  },
  async getNumber(){
    let { result } = await wx.cloud.callFunction({name: 'getdaka'})
    // console.log(result.result.data)
  this.setData({
    list:result.result.data
  })
  console.log(this.data.list)
    
  },
 
  onReady() {

  },

  onShow() {

  },


  onHide() {

  },


  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getNumber()
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