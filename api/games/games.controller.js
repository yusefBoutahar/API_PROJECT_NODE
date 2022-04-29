const res = require('express/lib/response');
const games = require('./games.model')
const ImageRepository = require('../s3_aws/imageRepository');
const imageRepository = new ImageRepository();

module.exports = {
    getAllGames : getAllGames,
    getGameById : getGameById,
    addGame : addGame,
    deleteGame : deleteGame,
    updateGame : updateGame,
    thisGameExists : thisGameExists
}


async function deleteGame(req, res){
    const id = req.params.id
    return games.deleteOne({_id : id})
    .then(response => {
        if(response.deletedCount == 0){
            return res.status(400).send({ 
                error: 400, 
                msg: 'No puedes borrar el juego porque no existe' })
        }else{
            return res.json({})
        }
    })
}

async function updateGame(req, res){
    const id  = req.params.id;
    if (!thisGameExists(id)) {
        return res.status(400).send({ error: 400, msg: 'Este juego no existe' })
    };

    const game = await games.findById(id);
    const imageURL = await imageRepository.uploadImage(game.title,req.file.buffer,req.file.mimetype);
    //console.log(imageURL)
    //game.image = imageURL;

    games.findByIdAndUpdate(
        { _id: id },
        { 
            title: req.body.title,
            studio: req.body.studio,
            platform: req.body.platform,
            releaseDate: req.body.releaseDate,
            minimunAge: req.body.minimunAge,
            image: imageURL
        },
        function(err, result) {
          if (err) {
            return res.status(400).send({ error: 400, msg: 'Este juego no existe' })
          } else {
            res.send("Juego actualizado con exito");
          }
        }
      );
}

async function addGame(req, res){
    if (!req.body.title && typeof req.body.title != 'string') {
        return res.status(400).send({ error: 400, msg: 'titulo incorrecto o inexistente' })
    };
    if (!req.body.studio && typeof req.body.studio != 'string') {
        return res.status(400).send({ error: 400, msg: 'estudio incorrecto o inexistente' })
    };
    if (!req.body.platform && typeof req.body.platform != 'string') {
        return res.status(400).send({ error: 400, msg: 'plataforma incorrecto o inexistente' })
    };
    if (!req.body.releaseDate && typeof req.body.releaseDate != 'string') {
        return res.status(400).send({ error: 400, msg: 'fecha incorrecto o inexistente' })
    };
    if (!req.body.minimunAge && typeof req.body.minimunAge != 'number') {
        return res.status(400).send({ error: 400, msg: 'edad minima incorrecto o inexistente' })
    };
    if (!req.body.image && typeof req.body.image != 'string') {
        return res.status(400).send({ error: 400, msg: 'url imagen incorrecto o inexistente' })
    };

    const newGame = {
        title: req.body.title,
        studio: req.body.studio,
        platform: req.body.platform,
        releaseDate: req.body.releaseDate,
        minimunAge: req.body.minimunAge,
        image: req.body.image
    }

    return games.create(newGame)
        .then(response => {
            return res.json(response)
        })
        .catch(err => {
            return res.status(400).send({ error: 400, msg: 'juego ya existente' })
        })
}

function getAllGames(req, res){

    return games.find({},'title studio platform releaseDate minimunAge image')
        .then(response => {
            return res.json(response)
        })
        .catch(err => console.error("Error al encontrar el juego"));

}



function getGameById (req, res){
    return games.findById(req.params.id)
        .then(response => {
            return res.json(response);
        })
        .catch(err => console.error("Error al encontrar el juego"));
}

async function thisGameExists(id){
    return ( await games.findOne({_id: id}) ) != null
}
