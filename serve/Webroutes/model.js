const mysql = require('mysql')
const connetion = mysql.createConnection({
    host:"127.0.0.1",
    user:'root',
    password:'root',
    database:'project'
})



//分类列表
exports.category = () => {
    let categorySql = 'select * from category'
    return new Promise((resolve,reject) => {
        connetion.query(categorySql,(err,result) => {
            if(err){
                reject({code:302,msg:'error'})
            }else{
                resolve(result)
            }
        })
    })
}
//右侧近期文章
exports.rightArticle = () => {
    let sql = 'select cont,name,id from detail order by date desc limit 6'
    return new Promise((resolve,reject) => {
        connetion.query(sql,(err,result) => {
            if(err){
                reject({code:302,msg:'数据不存在'})
            }else{
                resolve(result)
            }
        })
    })
}

exports.categoryTitle = (id) => {
    let sql = `select * from category where _id=${id}`
    return new Promise((resolve,reject) => {
        connetion.query(sql,(err,result) => {
            if(err){
                reject({code:'请传入正确的id'})
            }else{
                resolve(result)
            }
        })
    })
}

exports.categoryDatas = (id,callback) => {
    let sql = `select * from detail where detail._id = ${id} order by date desc limit 20`
    connetion.query(sql,(err,result) => {
        if(err){
            callback({code:302,msg:'请传入正确的id'})
        }else{
            callback(null,result)
        }
    })
}

exports.detailDatas = (id,callback) => {
    let sql = `select * from detail where detail.id=${id}`
    connetion.query(sql,(err,result) => {
        if(err){
            callback({code:302,msg:'获取详情页失败'})
        }else{
            callback(null,result)
        }
    })
}