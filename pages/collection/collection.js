// pages/collection/collection.js
// 引入date
import { getdate } from '../../utils/date'

Page({
  data: {
    postList: [], // 帖子列表
    id:''
  },

  /**
   * 页面加载
   */
  onLoad() {
    // 获取帖子
    this.getPostList()
  },
  toPost(event) {
    console.log(event.currentTarget.id)
  
    wx.navigateTo({
      url: `/pages/post/post?id=${event.currentTarget.id}`
    })    
  },
  // 获取帖子
  async getPostList() {
    // 请求云函数获取收藏数据
    let { result } = await wx.cloud.callFunction({name: 'getCollection'})
    console.log(result.data )
    let res = result.data
    this.data.id=res[0]._id

    console.log(this.data.id)

    // 将发布时间改成文字
    // result.data?.forEach(item => item.publish_date = getdate(item.publish_date))
    res?.forEach(item => item.publish_date = getdate(item.publish_date))

    // 更新data
    this.setData({ postList: res})
  }
})
