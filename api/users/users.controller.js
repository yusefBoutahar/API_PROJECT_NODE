const users = require('./users.model')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require('../../config');

module.exports = {
    getAllUsers : getAllUsers,
    getUserById : getUserById,
    addUser : addUser,
    deleteUser : deleteUser,
    updateUser : updateUser,
    thisUserExists : thisUserExists,
    thisUserExistsByEmail : thisUserExistsByEmail 
}

async function updateUser(req, res){
    const id  = req.params.id;
    if (!thisUserExists(id)) {
        return res.status(400).send({ error: 400, msg: 'Este usuario no existe' })
    };

    users.findByIdAndUpdate(
        { _id: req.params.id },
        { username: req.body.username,
         password: req.body.password,
         email: req.body.email },
        function(err, result) {
          if (err) {
            return res.status(400).send({ error: 400, msg: 'Este usuario no existe' })
          } else {
            res.send("Usuario actualizado con exito");
          }
        }
      );
}




async function deleteUser(req, res){
    const id = req.params.id
    return users.deleteOne({_id : id})
    .then(response => {
        if(response.deletedCount == 0){
            return res.status(400).send({ 
                error: 400, 
                msg: 'No puedes borrar el usuario porque no existe' })
        }else{
            return res.json({})
        }
    })
}    


async function addUser(req, res){
    if (!req.body.email && typeof req.body.email != 'string') {
        return res.status(400).send({ error: 400, msg: 'email incorrecto o inexistente' })
    };
    if (!req.body.username && typeof req.body.username != 'string') {
        return res.status(400).send({ error: 400, msg: 'username incorrecto o inexistente' })
    };
    if (!req.body.password ) {
        return res.status(400).send({ error: 400, msg: 'No pusiste una contraseña' })
    };





    bcrypt.hash(req.body.password, 2 , (err, passwordHash) =>{
        if(err){
            console.log(err)
        }else{
            const newUser = {
                username: req.body.username,
                password: passwordHash,
                email: req.body.email
            }
        
            return users.create(newUser)
                .then(response => {
                    return res.json(response)
                })
                .catch(err => {
                    return res.status(400).send({ error: 400, msg: 'este username ya existe' })
                })
        }
    })
}

function getAllUsers(req, res){
    return users.find({},'username email')
        .then(response => {
            return res.json(response)
        })
}


function getUserById (req, res){
    return users.findById(req.params.id)
        .then(response => {
            return res.json(response);
        })
        .catch(err => console.error("Error al encontra el usuario"));
}

async function thisUserExists(id) {
    return ( await users.findOne({_id: id}) ) != null
}


async function thisUserExistsByEmail(email2) {
    return ( await users.findOne({email: email2}) ) != null
}

