// pages/mycomment/mycomment.js
const db = wx.cloud.database()

const fc = db.collection('FatherComment')
Page({

  
  data: {
    list:null
  },

  
  onLoad() {
    this.getNumber()
  },
  async getNumber(){
    let { result } = await wx.cloud.callFunction({name: 'getComment'})
    // console.log(result.data[0].comment_details)
    this.setData({
    list:result.data
  })
  // console.log(result)
    
  },
  async deleteComment(event){
    console.log(event.currentTarget.id)
    wx.showModal({
      title: '提示',
      content: '确实删除该帖子吗？'
    }).then(res => {
    
      if(res.confirm) {

        fc.where({_id:event.currentTarget.id}).remove()
    
        wx.showToast({
          title: '删除成功',
        })

      }
     this.getNumber()
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