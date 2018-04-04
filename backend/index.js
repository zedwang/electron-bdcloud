const http = require('http');
const express = require('express')
const bodyParser = require('body-parser')
const app = new express()
const config = require('../config')
const { search, user, upload } = require('./controller')

app.use(bodyParser.json())

app.get('/search', search);
app.get('/user', user);
app.post('/upload', upload);

module.exports = app;