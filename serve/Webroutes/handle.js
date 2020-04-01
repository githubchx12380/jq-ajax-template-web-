const model = require('./model')
const fs = require('fs')
const path = require('path')
let dirname = path.join(__dirname,'/../../views/')


exports.publics = async (req,res) => {
   const category = await model.category()
   const rightarticle = await model.rightArticle()
   let obj = {
      category,
      rightarticle,
   }
   res.render(dirname + 'detail.html',obj)
}

exports.categoryData = async (req,res) => {
   let page = req.query.page || 1
   let id = req.params.id
   const category = await model.category()
   const rightarticle = await model.rightArticle()
   const categorytitle = await model.categoryTitle(id)
   model.categoryDatas(page,id,(err,data) => {
      if(err){
         res.send(err)
      }else{
         res.render(dirname + 'category.html',{
            data,    //分类页数据
            category,  //导航栏数据
            rightarticle, //右侧文章数据
            categorytitle, //分类名称数据
         })
      }
   })

}

exports.detailData = async (req,res) => {
   let id = req.params.id
   const category = await model.category()
   const rightarticle = await model.rightArticle()
   model.detailDatas(id,async (err,data) => {
      if(err){
         res.send(err)
      }else{
         let id =  data[0]._id
         const dataCategory = await model.categoryTitle(id)
         res.render(dirname + 'detail.html',{
            data,  //详情文章数据
            category,  //导航栏数据
            rightarticle, //右侧文章数据
            dataCategory, //当前位置
         })
      }
   })
}

exports.seekData = (req,res) => {
   let str = req.body.seek
   model.seekDatas(str,(err,data) => {
      if(err){
         res.send(err)
      }else{
         res.send(data)
      }
   })
}

exports.seekbutData = async (req,res) => {
   let str = req.query.seek
   const category = await model.category()
   const rightarticle = await model.rightArticle()
   model.seekDatas(str,(err,data) => {
      if(err){
         res.send(err)
      }else{
         res.render(dirname + 'category.html',{
            data,
            category,  //导航栏数据
            rightarticle, //右侧文章数据
         })
      }
   })
}
exports.pagelength = (req,res) => {
   let id = req.query.iid
   model.categorylen(id,(err,data) => {
      if(err){
         res.send(err)
      }else{
         let len = data.length
         res.send({code:200,len})
      }
   })
}

exports.logins = async (req,res) => {
   const category = await model.category()
   res.render(dirname + 'login.html',{
      category
   })
}
exports.signs = async (req,res) => {
   const category = await model.category()
   
   res.render(dirname + 'sign.html',{
      category
   })
} 
exports.userlogin = (req,res) => {
  let obj = req.body
  model.userlogins(req,obj,(err,data) => {
      if(err){
         res.send(err)
      }else{
         res.send(data)
      }
  })
}
exports.usersign = (req,res) => {
   let obj = req.body
   model.usersigns(req,obj,(err,data) => {
      if(err){
         res.send(err)
      }else{
         res.send(data)
      }
   })
}
exports.usersignin = (req,res) => {
   let obj = req.body
}

exports.userinfo = (req,res) => {
   let token = String(req.headers.authorization || '').split(' ').pop()
      model.userinfos(req,token,(err,data) => {
         if(err){
            res.send(err)
         }else{
            res.send(data)
         }
      })
}

exports.userops = async (req,res) => {
   const category = await model.category()
   res.render(dirname + 'userset.html',{
      category
   })
}


exports.userupdate = async (req,res) => {
   const obj = await model.uploadfile(req)
   model.userupdatas(obj,(err,data) => {
      if(err){
         res.send(err)
      }else{
         res.send(data)
      }
   })
} 


exports.newpassword = async (req,res) => {
   
   const obj = await model.uploadfile(req)
   
   model.userlogins(req,obj,(objects) => {
         if(objects.code === 200){
             model.newpasswords(obj,(err,data) => {
               if(err){
                  res.send(err)
               }else{
                  res.send(data)
               }
            })
         }else{
            res.send(objects)
         }
   })
}