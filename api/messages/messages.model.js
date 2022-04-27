const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema(
    {
        body:{
            type:String,
            require:true
        },
        user:{
            type:mongoose.Types.ObjectId,
            require:true
        },
        forum:{
            type:mongoose.Types.ObjectId,
            require:true
        }

    },
    {
        timestamps:true,
        versionKey:false
    }

)

const messages = new mongoose.model('messages',messageSchema)


module.exports = messages