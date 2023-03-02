// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
}); // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

// 云函数入口函数
exports.main = async (event, context) => {
  // console.log(event.met)

    // 排序规格
    let sort = {
        publish_date: -1
    };
    // 筛选规格
    let screen = {
        status: 0
    };
    // 从第几条数据开始查找
    const skip = event.pageSize * (event.pageIndex - 1);
// 排序 最热
    if (event.type === 1) {
        sort = Object.assign(
            {
                agree: -1
            },
            sort
        );
        // 获取最近七天的数据 且点赞数量必须大于等于1
        let lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        screen.publish_date = _.gte(lastWeek);
        screen.agree = _.gte(1);
    }
    // 筛选 圈子 搜索
    if (event.community) screen.community = event.community;
    if (event.search)
        screen.content = db.RegExp({
            regexp: event.search,
            options: 'i'
        }); // 模糊查询
    // 获取我的帖子时的用户id
    if (event.id) screen._openid = event.id;
    try {
      // list=[]
      // 联表查询
        let postList = await db
            .collection('Post')
            .aggregate()
            .match(screen)
            .sort(sort) // 排序 坑(先排序再跳过后查询)
            .skip(skip) // 跳过第n条开始查询
            .limit(event.pageSize) // 每次查询的数量
            .lookup({
                from: 'PostMedia',
                let: {
                    post_id: '$_id'
                },
                pipeline: $.pipeline()
                    .match(_.expr($.and([$.eq(['$post_id', '$$post_id'])])))
                    .sort({
                        order: 1
                    })
                    .done(),
                as: 'postMedia'
            }).end();

            
          let postList1 = await db
            .collection('Post')
            .aggregate()
            .match(screen)
            .sort(sort) // 排序 坑(先排序再跳过后查询)
            .skip(skip) // 跳过第n条开始查询
            .limit(event.pageSize) // 每次查询的数量
            .lookup({
                from: 'PostFile',
                let: {
                    post_id: '$_id'
                },
                pipeline: $.pipeline()
                    .match(_.expr($.and([$.eq(['$post_id', '$$post_id'])])))
                    .sort({
                        order: 1
                    })
                    .done(),
                as: 'postFile'
            }) .end();

            console.log(postList.list)
            console.log(postList1.list)
            
             var list=postList.list.concat(postList1.list);
            console.log(list);
            for(let w=0;w<list.length;w++){
              if(list[w].met!=''&&list[w].postMedia==''){
                // console.log(w)
                list.splice(w,1);
              }
              if(list[w].mets!=''&&list[w].postFile==''){
                // console.log(w)
                list.splice(w,1);
              }

            }
            for( let i=0;i<list.length;i++ ){
              console.log(i)
              for( j=i+1;j<list.length;j++){
                if(list[i].content===list[j].content&&list[i].met===''&&list[i].mets===''&&list[j].met===''&&list[j].mets===''){
            
                  list.splice(j, 1);
                }
              }
             }
 



console.log(list)

 return {
            code: 0,
            data:list,
            success: true
        };
       
    } catch (err) {
        console.error('transaction error');
        return {
            code: 1,
            success: false
        };
    }
};