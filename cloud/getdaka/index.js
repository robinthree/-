// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = cloud.getWXContext().OPENID
  // console.log(openid)
  let result= await db.collection('daka').where({openid:openid}).get()
  
  console.log(result.data[0].number)

  let i =result.data.length
  console.log(i)
  // let 
  return {
    result,
    i,
    event,
    // openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    // unionid: wxContext.UNIONID,
  }
}