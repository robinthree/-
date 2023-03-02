// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()



// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = cloud.getWXContext().OPENID
  console.log(event)
  let d={
    number:event.number,
    openid: cloud.getWXContext().OPENID,
    nick_name:event.nick_name,
    avatar_url:event.avatar_url,
    
  }

  let result= await db.collection('daka').add({
    data:d
    })
      console.log(result)
return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}