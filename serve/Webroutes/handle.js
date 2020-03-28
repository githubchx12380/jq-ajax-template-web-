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
   let id = req.params.id
   const category = await model.category()
   const rightarticle = await model.rightArticle()
   const categorytitle = await model.categoryTitle(id)
   
   model.categoryDatas(id,(err,data) => {
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
   model.detailDatas(id,(err,data) => {
      if(err){
         res.send(err)
      }else{
         res.render(dirname + 'detail.html',{
            data,  //详情文章数据
            category,  //导航栏数据
            rightarticle, //右侧文章数据
         })
      }
   })
   
}