// state requirements
const express = require('express');
const app = express();

app.get('/', function(req, res){
    console.log("someone is here");
    res.sendFile(__dirname + '/game.html');
});

app.use(express.static(__dirname + '/'));

app.listen(8080);
