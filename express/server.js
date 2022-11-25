'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const https = require('node:https');
const characters = require('./responses/characters');
const morty = require('./responses/morty')

const callApi =  (req, res) => {
  https.get(`https://rickandmortyapi.com/api/character/${req.params.id}`, (character) => {
    console.log('statusCode:', character.statusCode);
    console.log('headers:', character.headers);
    let body = '';

    character.on('data', function(chunk){
      body += chunk;
    });

    character.on('end', function(){
      let response = JSON.parse(body);
      res.json(response)
    });

  }).on('error', (e) => {
    console.error(e);
    res.json(morty)
  });
}


const router = express.Router();
app.get('/api/character', (req, res) => res.json(characters));
app.get('/api/character/:id', callApi);
app.post('/api/character/:id', callApi);
app.put('/api/character/:id', callApi);
app.delete('/api/character/:id', callApi);


app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
