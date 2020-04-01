const mysql = require('mysql')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const jwt = require('jsonwebtoken')

const formidable = require('formidable')
const form=new formidable.IncomingForm();
form.keepExtensions = true
const path = require('path')


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

//判断username是否注册,如果没注册调用userinsert函数,增加数据
exports.usersigns = (req,obj,callback) => {
    let username = obj.username
    let sql = `select * from webuser where username='${username}'`
    connetion.query(sql,async function (err,result) {
        if(result.length == 0){
             const jwttoken = await userinsert(req,obj)
            callback({code:200,mes:'注册成功',token:jwttoken})
        }else{
            callback({code:302,msg:'注册失败,账号已经存在'})
        }
    })
}
//
function userinsert(req,obj) {
    return new Promise((resolve,reject) => {
        let sql = `insert into webuser set ?`
        var hash = bcrypt.hashSync(obj.password,salt);
        obj = {
            username:obj.username,
            password:hash,
            email:obj.email
        }
        connetion.query(sql,obj,(err,result) => {
            if(err){
                reject(err)
            }
            var objtoken =  jwt.sign({id:result.insertId},req.app.get('selectToken')) 
            resolve(objtoken)
        })
    })
}

//token中间件查询id是否存在使用
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

//ajax渲染用户信息
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

//文件处理
exports.uploadfile =  (req) => {
    return new Promise((resolve,reject) => {
        form.uploadDir = "../serve/upload";
        form.parse(req,(err, fields, files) => {
        let obj = fields
        if(files.img != null){
            obj.img = path.basename(files.img.path)
            resolve(obj)
            return
        }
        resolve(obj)
        });
    })
}

//修改基本资料
exports.userupdatas = (obj,callback) => {
    let sql = `update webuser set ? where id = ${obj.id}`
    connetion.query(sql,obj,(err,result) => {
        if(err){
            callback({code:302,msg:'上传失败'})
        }else{
            callback(null,{code:200,meg:'上传成功'})
        }
    })
}


//修改密码
exports.newpasswords = (obj,callback) => {
    var hash = bcrypt.hashSync(obj.newpassword,salt);
    obj = {
        id:obj.id,
        password:hash
    }
    let sql = `update webuser set ? where id = ${obj.id}`
    connetion.query(sql,obj,(err,result) => {
        if(err){
            callback({code:302,msg:'修改失败,请输入正确的密码'})
        }else{
            callback({code:200,msg:'修改成功'})
        }
    })
}