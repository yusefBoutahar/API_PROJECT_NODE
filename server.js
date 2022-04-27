const DB_URI = require('./private/globals');
const express = require('express');
require('mongoose').connect(DB_URI,
    {
        useNewUrlParser:true, 
        useUnifiedTopology:true,
        autoIndex:true
    },(err) =>{
        if(err){
            console.log("ERROR EN LA CONEXION");
        }else{
            console.log("CONEXION CORRECTA");
        }
    })

const app = express();

const usersRouter = require('./api/users');
const messagesRouter = require('./api/messages');
const gamesRouter = require('./api/games');
const forumsRouter = require('./api/forums');

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/games', gamesRouter);
app.use('/api/forums', forumsRouter);

app.listen(4200);

/*
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

messages.create(
    {
        body:"hola que tal",
        user:"6269267c9932754f6402c7d9",
        forum:"626938e1c0f23b5e1acdeadb"
    }
)*/