// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // userInfo结构出来是因为在手机上发布帖子会携带该属性到数据表中
  let { met,mets, userInfo, upCloudImages,uploadFile, ...data } = event
  try {
    // 文本内容安全检测
    const msgSecCheckRes = await cloud.callFunction({
      name: 'msgSecCheck',
      data: { text: data.content,openid:cloud.getWXContext().OPENID }
    })
//  console.log(msgSecCheckRes.result)
    // 判断文本是否违规
    if(msgSecCheckRes.result.result.suggest != "pass") {
      return {
        code: 1,
        error: '文字內容违规',
        success: false
      }
    }

    let post = {
      _openid: cloud.getWXContext().OPENID,
      ...data,
      met:met,
      mets:mets,
      publish_date: new Date(),
      status: 0,
      agree: 0,
      comment: 0
    }
    console.log(mets)
    console.log(met)
if(mets===''&&met===''){
 var r=1
//  db.collection('Post').add({ data: post })
 console.log(3333)
}


if(mets==='images'||r===1){
   // 添加帖子
   db.collection('Post').add({ data: post })
   .then(res => {
     // 遍历图片添加到数据表中
     upCloudImages.forEach(item => {
       item.post_id = res._id
       db.collection('PostMedia').add({ data: item })
     })
    
   })
}
   if(met==='file'){
      // 添加帖子
   db.collection('Post').add({ data: post })
   .then(res => {
     // 遍历文件添加到数据表中
     uploadFile.forEach(item => {
       item.post_id = res._id
       db.collection('PostFile').add({ data: item })
     })
   })
   }

    return {
      code: 0,
      success: true
    }
  }
  catch(err) {
    console.error('transaction error')
    return {
      code: 1,
      success: false
    }
  }
}
