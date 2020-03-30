const mysql = require('mysql')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const jwt = require('jsonwebtoken')
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

exports.categoryDatas = (page,id,callback) => {
    let sql = `select * from detail where detail._id = ${id} order by date desc limit ${(page - 1) * 20},20`
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

exports.seekDatas = (str,callback) => {
    let sql = `select * from detail where name like '%${str}%' limit 7`
    connetion.query(sql,(err,result) => {
        if(err){
            callback({code:302,msg:'搜索失败'})
        }else{
            callback(null,result)
        }
    })
}

exports.categorylen = (id,callback) => {
    let sql = `select * from detail where detail._id = ${id}`
    connetion.query(sql,(err,result) => {
        if(err){
            callback({code:302,msg:'error'})
        }else{
            callback(null,result)
        }
    })
}

exports.userlogins = (req,obj,callback) => {
    let {username,password} = obj
   
    let sql = `select * from webuser where username='${username}'`
    connetion.query(sql,(err,result) => {
        if(err){
            callback(err)
            return
        }
        if(!result.length){
            callback({code:302,msg:'账号不存在'})
            return
        }
        const psd = bcrypt.compareSync(password,result[0].password)
        if(!psd){
            callback({code:302,msg:'密码错误'})
            return
        }
        const token = jwt.sign({id:result[0].id},req.app.get('selectToken'))
        let message = {
            code:200,
            msg:'登录成功',
            token:token
        }
        callback(message)
    })
}

exports.usersigns = (obj,callback) => {
    let username = obj.username
    let sql = `select * from webuser where username='${username}'`
    connetion.query(sql,function (err,result) {
        if(result.length == 0){
            callback({code:200,msg:'账号未被注册'})
        }else{
            callback({code:302,msg:'账户已存在'})
        }
    })
}

exports.usersignins = (obj,callback) => {
    let sql = `insert into webuser set ?`
    var hash = bcrypt.hashSync(obj.password,salt);
    obj = {
        username:obj.username,
        password:hash,
        email:obj.email
    }
    connetion.query(sql,obj,(err,result) => {
        if(err){
            callback({code:302,msg:'注册失败'})
        }else{
            callback(null,result)
        }
    })
}

exports.autoId = (id) => {
    let sql = `select * from webuser where id=${id}`
    return new Promise((resolve,reject) => {
        connetion.query(sql,(err,result) => {
            if(err){
               reject({msg:'服务器内部错误'})
            }else{
               resolve(result)
            }
        })
    })
}


exports.userinfos = (req,token,callback) =>{
    let id = jwt.verify(token,req.app.get('selectToken')).id
    let sql = `select * from webuser where id=${id}`
    connetion.query(sql,(err,result) => {
        if(err){
            callback({code:402,msg:'用户信息获取失败'})
        }else{
            callback(null,{code:200,data:result})
        }
    })
}