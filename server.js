const express = require('express');
const config = require('./config');
require('mongoose').connect(config.database.db_uri,
    {
        useNewUrlParser:true, 
        useUnifiedTopology:true,
        autoIndex:true
    },(err) =>{
        if(err){
            console.log("ERROR EN LA CONEXION");
        }else {
            console.log("CONECTADO A LA DB");
        }
    })

const app = express();

const usersRouter = require('./api/users');
const messagesRouter = require('./api/messages');
const gamesRouter = require('./api/games');
const forumsRouter = require('./api/forums');

app.use(express.json());
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);
app.use('/games', gamesRouter);
app.use('/forums', forumsRouter);

app.listen(config.port, config.host, function () {
    console.log(`(if local) App listening on http://${config.host}:${config.port}`);
  });