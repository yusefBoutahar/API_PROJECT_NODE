const mongoose = require('mongoose');


const gameSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            require:true
        },
        studio:{
            type:String,
            require:true
        },
        platform:{
            type:String,
            require:true
        },
        releaseDate:{
            type:String
        },
        minimunAge:{
            type:Number,
            require:true
        },
        image:{
            type:String
        }
    }
)

const games = new mongoose.model('games',gameSchema)


module.exports = games