const User = require("../users/users.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require('../../config');

module.exports = {
    login : login
}

async function login (req, res) {
    console.log(req.body)
    const {body} = req
    const {username, password} = body

    const user = await User.findOne({username})
    const passwordCorrect = user == null 
    ? false
    : await bcrypt.compare(password, user.password)

    if(! (user && passwordCorrect)){
        return res.status(401).json({
            error: 'usuario o contraseña incorrectos'
        })
    }

    const userToken = {
        id : user._id,
        username : user.username
    }
    const token = jwt.sign(userToken, config.secretToken)

    return res.send({
        name: user.username,
        token
    })
}