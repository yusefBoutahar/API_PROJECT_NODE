const mongoose = require('mongoose');


const forumSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            unique:true,
            require:true
        },
        game:{
            type:mongoose.Types.ObjectId,
            require:true
        }
    }
)

const forums = new mongoose.model('forums',forumSchema)


module.exports = forums