//const config = require('./config.js');
const express = require('express');
require('dotenv').config();
require('mongoose').connect(process.env.DB_URI,
    {
        useNewUrlParser:true, 
        useUnifiedTopology:true,
        autoIndex:true
    },(err) =>{
        if(err){
            console.log("ERROR EN LA CONEXION");
        }else {
            console.log("Conectado a la BD");
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

app.listen(process.env.PORT, process.env.HOST, function () {
    console.log(`App listening on http://${process.env.HOST}:${process.env.PORT}`);
  });