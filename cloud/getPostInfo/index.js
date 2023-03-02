// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  
  try {
    // 联表查询
    let post = await db.collection('Post').aggregate().match({_id: event.id, status: 0})
    .lookup({
      from: 'PostMedia',
      let: { post_id: '$_id' },
      pipeline: $.pipeline()
        .match(_.expr($.and([
          $.eq(['$post_id', '$$post_id'])
        ])))
        .sort({ order: 1 })
        .done(),
      as: 'postMedia'
    }).end()

    let post1 = await db.collection('Post').aggregate().match({_id: event.id, status: 0})
    .lookup({
      from: 'PostFile',
      let: { post_id: '$_id' },
      pipeline: $.pipeline()
        .match(_.expr($.and([
          $.eq(['$post_id', '$$post_id'])
        ])))
        .sort({ order: 1 })
        .done(),
      as: 'postFile'
    }).end()

//     if(post.list[0].met=='file'){
//       console.log(1)
//       var R=post1
//     }
//     if(post.list[0].mets=='images'&&post.list[0].met==''){
//       console.log(1)
//       var R=post
//  console.log(R)
//     }
console.log(post)
console.log(post1)

if(post.list[0].postMedia.length===0&&post1.list[0].postFile.length===0){
  console.log(1)
  
  var R=post
}
if(post.list[0].postMedia!=''&&post1.list[0].postFile==''){
  console.log(2)
  var R=post
}
if(post.list[0].postMedia==''&&post1.list[0].postFile!=''){
  var R=post1
  console.log(3)
}
    // console.log(post.list)
    // console.log(post1.list)
    // console.log(R)



    return {
      code: 0,
      data: R.list[0],
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
