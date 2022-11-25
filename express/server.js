'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const https = require('https');
const characters = require('./responses/characters');
const morty = require('./responses/morty')

const getIdFromRequest = (req) => {
  switch (req.method) {
    case 'POST':
    case 'PUT':
      return req.body?.id;
    case 'GET':
    case 'DELETE':
      return req.params?.id;
  }
}

const callApi = (req, res) => {
  const id = getIdFromRequest(req);
  https.get(`https://rickandmortyapi.com/api/character/${id}`, (character) => {
    let body = '';
    character.on('data', function (chunk) {
      body += chunk;
    });
    character.on('end', function () {
      let response = JSON.parse(body);
      res.json(response)
    });
  }).on('error', (e) => {
    console.error(e);
    res.json(morty)
  });
}

router.get('/api/character', (req, res) => res.json(characters));
router.get('/api/character/:id', callApi);
router.post('/api/character', jsonParser, callApi);
router.put('/api/character', jsonParser, callApi);
router.delete('/api/character/:id', callApi);

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
