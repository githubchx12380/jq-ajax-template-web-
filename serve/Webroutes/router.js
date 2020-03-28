module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const handle = require('./handle')
    app.use(router)
    router.get('/category',handle.publics) //公共导航,右侧文章
          .get('/category/:id',handle.categoryData)
          .get('/detail/:id',handle.detailData)
}