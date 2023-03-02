// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event)

  let res= await db.collection('user').where({_openid:event.id}).get()
  console.log(res.data[0]._id)
  let id = res.data[0]._id
   let result= await db.collection('user').where({_id:id}).update({
   data:{
    mima:event.mima,
   }

  })
//  console.log(result)

  return {
  res,
    result
    
  }
}