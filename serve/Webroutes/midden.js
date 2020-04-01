const jwt = require('jsonwebtoken')
const model = require('./model')


module.exports =   {
    tokennews: async function (req,res,next) {
        let token = String(req.headers.authorization || '').split(' ').pop()
        if(!token){
            return res.status(402).send('请先登录');
        }
        const {id} = jwt.verify(token,req.app.get('selectToken'))
        if(!id){
            return res.status(402).send('请先登录');
        }
       
        const user = await model.autoId(id)
        if(!user){
            return res.status(402).send('请先登录');
        }
        next()
    },
    
}