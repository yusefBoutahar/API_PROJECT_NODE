const res = require('express/lib/response');
const forums = require('./forums.model')


module.exports = {
    getAllForums : getAllForums,
    getForumById : getForumById,
    getAllForumsByGame : getAllForumsByGame,
    addForum : addForum,
    deleteForum : deleteForum,
    thisForumExists : thisForumExists,
    updateForum : updateForum
}
const thisGameExists = require('../games/games.controller').thisGameExists


function getAllForumsByGame(req, res){
    return forums.find({ game: req.params.gameId })
        .then(response => {
            return res.json(response);
        })
        .catch(err => res.status(404).send({ error: 404, msg: 'No se encontraron foros para este juego' }));
}

async function updateForum(req, res){
    const id  = req.params.id;
    if (!thisForumExists(id)) {
        return res.status(400).send({ error: 400, msg: 'Este foro no existe' })
    };

    forums.findByIdAndUpdate(
        { _id: req.params.id },
        { 
            title: req.body.title,
            game: req.body.game,

        },
        function(err, result) {
          if (err) {
            return res.status(400).send({ error: 400, msg: 'Este foro no existe' })
          } else {
            res.send("Foro actualizado con exito");
          }
        }
      );
}

async function deleteForum(req, res){
    const id = req.params.id
    return forums.deleteOne({_id : id})
    .then(response => {
        if(response.deletedCount == 0){
            return res.status(400).send({ 
                error: 400, 
                msg: 'No puedes borrar el foro porque no existe' })
        }else{
            return res.json({})
        }
    })
}

async function addForum(req, res){
    if (!req.body.title || typeof req.body.title != 'string') {
        return res.status(400).send({ error: 400, msg: 'No pusiste un titulo de foro' })
    };
    if (!req.body.game) {
        return res.status(400).send({ error: 400, msg: 'No pusiste un juego asociado al foro' })
    };
    if (! (await thisGameExists(req.body.game)) ) {
        return res.status(404).send({ error: 404, msg: 'No se puede crear un foro a un juego inexistente' })
    }

    const newForum = {
        title: req.body.title,
        game: req.body.game
    }
    return forums.create(newForum)
        .then(response => {
            return res.json(response)
        })
        .catch(err => {
            return res.status(404).send({ error: 404, msg: 'Este foro ya existe' })
        })

}


function getAllForums(req, res){

    return forums.find({},'title game')
        .then(response => {
            return res.json(response)
        })
        .catch(err => console.error("Error al encontrar el foro"));

}



function getForumById (req, res){
    return forums.findById(req.params.id)
        .then(response => {
            return res.json(response);
        })
        .catch(err => console.error("Error al encontrar el foro"));
}

async function thisForumExists(id){
    return ( await forums.findOne({_id: id}) ) != null
}
