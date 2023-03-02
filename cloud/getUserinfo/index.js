// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
console.log(event)
console.log(wxContext.OPENID)
if(event.f==='zhuce'){
  let result = await db.collection('user').where({
    zhanghao:event.zhanghao
  }).get()
  console.log(result)
  var status=200
 if(result.data.length>0)  status=400;
}
if(event.f==='denglu'){
  // console.log(openid)
  let result1 = await db.collection('user').where({
    _openid: cloud.getWXContext().OPENID
   }).get()
   console.log(result1)
 
 var r =400
 if(result1.data[0].zhanghao===event.zhanghao&&result1.data[0].mima===event.mima) r=200;
 if(result1.data.length<0) r=400;
}  

  
  return {
    event,
   status,
   r,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}