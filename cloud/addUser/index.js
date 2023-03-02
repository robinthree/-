// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
//用户信息
  let d={
    zhanghao: event.zhanghao,
    mima:event.mima,
    _openid: cloud.getWXContext().OPENID
  }
  //添加进数据库
  db.collection('user').add({ data: d})
 
  return {
    event,
    // openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}