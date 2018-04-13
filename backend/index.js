const express = require('express');
const bodyParser = require('body-parser');
const app = new express();
const { user, file } = require('./controller');

app.use(bodyParser.json());

app.get('/search', file.search);
app.get('/user', user);
app.post('/upload', file.upload);
app.post('/folder', file.createFolder);

module.exports = app;