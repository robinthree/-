// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = cloud.getWXContext().OPENID
  let d={
  _openid:openid,
  pinlun:'',
  dianzan:'',
  shoucang:''
  }

  let result= await db.collection('XiaoXi').where({_openid:openid}).get()
      console.log(result)
  if(result.data.length===0){
    db.collection('XiaoXi').add({data:d})
  }

  return {
    result,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}