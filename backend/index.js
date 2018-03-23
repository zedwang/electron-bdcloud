const http = require('http');
const express = require('express')
const app = new express()
const config = require('../config')
const { search, user } = require('./controller')


app.get('/search', search);
app.get('/user', user);

module.exports = app;