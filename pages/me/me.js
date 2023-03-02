// pages/me/me.js
const db = wx.cloud.database()
const Administrator = db.collection('Administrator')

Page({
  data: {
    userInfo: {}, // 用户信息
    isAdmin: false,// 是否为超级管理员
    w:true,
    ww:false,
    // h:0
  },

  /**
   * 页面加载
   */
onShow(){
  // this.tongzhi()

},
  
  onLoad() {
    // 获取用户信息
    let userInfo = wx.getStorageSync('currentUser')
    this.setData({ userInfo })

    // 获取管理员信息
    this.isAdministrator()

    this.tongzhi()
  },
  //下拉刷新操作
  onPullDownRefresh() {
    

  },
//获取消息通知
  async tongzhi(){
  let  {result}  = await wx.cloud.callFunction({
    name: 'xiaoxi',
   
  })
  console.log(result.result.data[0].pinlun)
  if(result.result.data[0].pinlun===1){
    this.setData({
      w:false,
      ww:true,
      
    })
  }else if(result.result.data[0].pinlun===0){
    this.setData({
      w:true,
      ww:false,
      
    })
  }
  // this.onLoad()
},

  // 获取管理员信息
  async isAdministrator() {
    let { data } = await Administrator.where({_openid: this.data.userInfo._openid}).get()
    if(data[0].super_admin === 0) this.setData({ isAdmin: true })
  },

  // 跳转到我的帖子
  toMyPost() {
    wx.navigateTo({
      url: '/pages/myPost/myPost'
    })
  },
  //跳到修改密码
  toModify(){
wx.navigateTo({
  url: '/pages/modify/modify',
})
  },
  // 跳转到收藏
  toCollection() {
    wx.navigateTo({
      url: '/pages/collection/collection'
    })
  },

  // 跳转到修改资料
  toEditProfile() {
    wx.navigateTo({
      url: '/pages/editProfile/editProfile'
    })
  },
 // 跳转到消息通知
 toXiaoXi() {
  wx.navigateTo({
    url: '/pages/xiaoxi/xiaoxi'
  })
},


   // 跳转到我的评论
   toComment() {
    wx.navigateTo({
      url: '/pages/mycomment/mycomment'
    })
  },
//跳转到打卡页面
  todaka() {
    wx.navigateTo({
      url: '/pages/daka/daka'
    })
  },
  // 跳转到关于我们
  toAboutUs() {
    wx.navigateTo({
      url: '/pages/aboutUs/aboutUs'
    })
  },

  // 跳转到退出登录
  toSignOut() {
    wx.navigateTo({
      url: '/pages/signOut/signOut'
    })
  },

  // 跳转到资讯管理
  toSwiperAdmin() {
    wx.navigateTo({
      url: '/pages/swiperAdmin/swiperAdmin'
    })
  },

  //管理
guanli(){
  wx.navigateTo({
    url: '/pages/guanli/guanli'
  })
},

  // 功能未开放
  undefined() {
    wx.showToast({
      title: '作者在疯狂打码中...',
      icon: 'none',
      duration: 1000
    })
  }
})
