const express = require('express');
const bodyParser = require('body-parser');
const app = new express();
const { user, file } = require('./controller');

app.use(bodyParser.json());

app.get('/files', file.search);
app.post('/files/upload', file.upload);
app.get('/files/rename/:id', file.rename);
app.post('/files/moving', file.move);
app.delete('/files/:id', file.delete);
app.post('/files/delete', file.delete);
app.post('/folder', file.createFolder);
app.get('/user', user);

module.exports = app;