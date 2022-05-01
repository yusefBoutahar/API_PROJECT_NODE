const jwt = require("jsonwebtoken")
const config = require('../../config');


module.exports = (req,res,next) =>{

    const authorization = req.get('authorization')
    let token = null
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.split(' ')[1]
    }
    
    let decodeToken = {}
    try {
        decodeToken = jwt.verify(token, config.secretToken)
    } catch {}
    
    if(!token || !decodeToken.id){
        return res.status(401).send({ error: 400, msg: 'token invalido' })
    }

    const {id : userId} = decodeToken
    req.userId = userId
    next()
}
    
