

// const db = wx.cloud.database()
Page({
  
 
  data: {
  can:false,
number:0,
leixing:0,
date:{},
selected: [
  // {
  //   date: '2023-2-21'
  // }
]

  },
  /**
  * 日历是否被打开
  */
 bindselect(e) {
  // console.log(e.detail.ischeck)
},
/**
 * 获取选择日期
 */
bindgetdate(e) {
  let time = e.detail;
  // console.log(time)
  // console.log(time.year+'-'+time.month+'-'+time.date)
  this.setData({
    date:{date: time.year+'-'+time.month+'-'+time.date}
  })
  console.log(this.data.date)
 
  // console.log(this.data.selected)


},


onLoad(){
  // this.getNumber()
},
onShow(){
  this.getNumber()

},
 
async getNumber(){
      let { result } = await wx.cloud.callFunction({name: 'getdaka'})
      console.log(result)
      // console.log(result.result.data[0].date)
      if(result.i===0){
        this.addNumber()
           this.setData({
       number:0,
       can:true
     })
     
         }
         if(result.i!==0){
           this.setData({
             number:result.result.data[0].number,
           })
           console.log(result.result.data[0].number)
           if(result.result.data[0].number!==0){
            var i= result.result.data[0].date.length
            this.setData({
              selected:result.result.data[0].date

            })
            console.log(result.result.data[0].date[i-1].date)
 console.log(this.data.date.date)
  if(result.result.data[0].date[i-1].date===this.data.date.date){
    console.log(123)
    this.setData({
      can:false
    })
  }else{
    console.log(312)
    this.setData({
      can:true
    }  
    )
  }
           }else if(result.result.data[0].number===0){
            console.log(this.data.date)
            this.setData({
              can:true
            })
           }
          
         }
   

 
 // console.log(this.data.selected)
     
    },
 async addNumber(){
  let { nick_name, avatar_url } = wx.getStorageSync('currentUser')
    let { result } = await wx.cloud.callFunction({name: 'adddaka'
   , data:{
     number:0,
    nick_name:nick_name,
    avatar_url:avatar_url,
    date:null
    }
  })
  // console.log(result)
    
},
async upNumber(){

  this.data.selected.push(this.data.date)
    console.log(this.data.selected)

// console.log(this.data.number)
if(this.data.can===true){
  this.setData({
    number:this.data.number+1,
  })
  let { result } = await wx.cloud.callFunction({name: 'updaka',
  data:{
   number:this.data.number,
   date:this.data.selected
  }
})
  // console.log(result)
  wx.showToast({
    title: '打卡成功',
  })
}else if(this.data.can===false){
  wx.showToast({
    title: '打卡失败',
  })
}
  
this.getNumber()
  

}
})
