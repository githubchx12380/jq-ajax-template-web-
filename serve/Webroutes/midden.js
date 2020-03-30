const jwt = require('jsonwebtoken')
const model = require('./model')
module.exports = async (req,res,next) => {
    let token = String(req.headers.authorization || '').split(' ').pop()
    if(!token){
        return res.redirect('/web/login');
        // return res.status(401).send({code:401,msg:'请先登录'})
    }
    const {id} = jwt.verify(token,req.app.get('selectToken'))
    if(!id){
        return res.redirect('/web/login')
    }
   
    const user = await model.autoId(id)
    if(!user){
        return res.redirect('/web/login')
    }
    next()
}