const http = require('http');
const express = require('express')

const app = new express()
const config = require('../config')
const debug = require('debug')('dev:server')

const paths = config.get('utils.paths')


app.get('/music/url', function (request, response) {
	var id = parseInt(request.query.id);
	var br = parseInt(request.query.br);
	var data = {
		"ids": [id],
		"br": br,
		"csrf_token": ""
	};
	console.log(data);
	var cookie = request.get('Cookie') ? request.get('Cookie') : '';
});

app.get('/search', function (request, response) {
	var keywords = request.query.keywords;
	var type = request.query.type;
	var limit = request.query.limit;
	var data = 's=' + keywords + '&limit=' + limit + '&type=' + type + '&offset=0';
	
});

module.exports = app;
