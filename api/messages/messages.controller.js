const res = require('express/lib/response');
const messages = require('./messages.model')


module.exports = {
    getAllMessages : getAllMessages,
    getMessageById : getMessageById,
    addMessage : addMessage,
    deleteMessage : deleteMessage,
    getAllMessagesByOwner : getAllMessagesByOwner,
    updateMessage : updateMessage,
    thisMessageExists : thisMessageExists,
    getAllMessagesByForum : getAllMessagesByForum
}
const thisUserExists = require('../users/users.controller').thisUserExists
const thisForumExists = require('../forums/forums.controller').thisForumExists


async function updateMessage(req, res){
    const id  = req.params.id;
    if (!thisMessageExists(id)) {
        return res.status(400).send({ error: 400, msg: 'Este mensaje no existe' })
    };

    messages.findByIdAndUpdate(
        { _id: req.params.id },
        { 
            body: req.body.body,
        },
        function(err, result) {
          if (err) {
            return res.status(400).send({ error: 400, msg: 'Este mensaje no existe' })
          } else {
            res.send("Mensaje actualizado con exito");
          }
        }
      );
}

async function deleteMessage(req, res){
    const id = req.params.id
    return messages.deleteOne({_id : id})
    .then(response => {
        if(response.deletedCount == 0){
            return res.status(400).send({ 
                error: 400, 
                msg: 'No puedes borrar el mensaje porque no existe' })
        }else{
            return res.json({})
        }
    })
}

async function addMessage(req, res){
    if (!req.body.body) {
        return res.status(400).send({ error: 400, msg: 'No pusiste un cuerpo' })
    };
    if (!req.body.forum) {
        return res.status(400).send({ error: 400, msg: 'No pusiste un foro' })
    };
    if (! (await thisUserExists(req.body.user)) ) {
        return res.status(404).send({ error: 404, msg: 'Ese owner no existe entre los usuario' })
    }
    if (! (await thisForumExists(req.body.forum)) ) {
        return res.status(404).send({ error: 404, msg: 'Ese foro no existe' })
    }
    const newMessage = {
        body: req.body.body,
        forum: req.body.forum,
        user: req.body.user
    }
    return messages.create(newMessage)
        .then(response => {
            return res.json(response)
        })
        .catch(err => {
            return res.status(404).send({ error: 404, msg: 'No se pudo crear el mensaje' })
        })

}

function getAllMessages(req, res){

    return messages.find({},'body updatedAt forum user')
        .then(response => {
            return res.json(response)
        })
        .catch(err => res.status(404).send({ error: 404, msg: 'No se pudo obtener los mensajes' }));

}



function getMessageById (req, res){
    return messages.findById(req.params.id)
        .then(response => {
            return res.json(response);
        })
        .catch(err => res.status(404).send({ error: 404, msg: 'Error al encontrar mensaje' }));
}

function getAllMessagesByOwner(req, res){
    return messages.find({ user: req.params.userId })
        .then(response => {
            return res.json(response);
        })
        .catch(err => res.status(404).send({ error: 404, msg: 'No se encontraron mensajes de este usuario' }));
}

function getAllMessagesByForum(req, res){
    return messages.find({ forum: req.params.forumId })
        .then(response => {
            return res.json(response);
        })
        .catch(err => res.status(404).send({ error: 404, msg: 'No se encontraron mensajes de este foro' }));
}

async function thisMessageExists(id){
    return ( await messages.findOne({_id: id}) ) != null
}
