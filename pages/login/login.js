// pages/login/login.js
const app = getApp()

const db = wx.cloud.database()
const User = db.collection('User')

Page({
  data: {
    stateheight: app.globalData.stateheight,
    icon: '/static/images/login/icon.png',
    coordinate: [
      {x: -20, y: 80},
      {x: 680, y: 150},
      {x: 300, y: 250},
      {x: -20, y: 450},
      {x: 580, y: 540},
      {x: 200, y: 700},
      {x: 450, y: 900},
      {x: 150, y: 1100},
      {x: 650, y: 1200},
      {x: 180, y: 1460},
    ],
    adminOpenId: []
  },
//注册
UserRegister(){
  
wx.navigateTo({
  url: '/pages/register/register',
})
},
//用户登录
UserLogin(){
  wx.navigateTo({
    url: '/pages/userlogin/userlogin',
  })
  },
  // 登录的回调函数
  getUserProfile() {
    // 获取用户信息
   let resB = wx.getUserProfile({desc: "用于个人信息展示"
  
  }).then(res => {
      let user = {
        avatar_url: res.userInfo.avatarUrl,
        nick_name: res.userInfo.nickName,
        gender: res.userInfo.gender,
        autograph: '青春像一朵棉花',
        create_date: new Date()
      }
      console.log(resB)
      // 将个人信息存储到本地
      wx.setStorageSync('currentUser', user)
    //  let  resA = User.where({_openid:})
    // ||resB.affectedDocs===undefined
      if(resB.affectedDocs<=0){
        // 將用戶添加到数据库
        User.add({data: user}).then(() => {
          wx.switchTab({ url: '/pages/index/index' })

        })

      }else{
        wx.switchTab({ url: '/pages/index/index' })
      }
      
     
    })
  }
})
