module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const handle = require('./handle')
    const middenauto = require('./midden')
    
    app.use(router)

    router.get('/category',handle.publics) //公共导航,右侧文章
          .get('/category/:id',handle.categoryData) //通过id获取单个导航数据
          .get('/detail/:id',handle.detailData) //通过id获取单个文章数据
          .post('/seek',handle.seekData) //input模糊查询
          .get('/seek',handle.seekbutData) //submit跳转
          .get('/pagelength',handle.pagelength) //获取分页总页数
          .get('/web/login',handle.logins)  //渲染login页面
          .get('/web/sign',handle.signs)  //渲染sign页面
          .post('/userlogin',handle.userlogin) //登录效验
          .post('/usersign',handle.usersign) //验证用户名唯一
          .post('/usersignin',handle.usersignin) //用户信息注册
          .get('/userset',handle.userops)  //渲染基本资料页面
          .get('/web/user/info',middenauto.tokennews,handle.userinfo) //主页面获取用户数据
          .post('/userupdate',middenauto.tokennews,handle.userupdate)  //修改用户基本信息
          .post('/new/psd',middenauto.tokennews,handle.newpassword)   //修改用户密码
        
}