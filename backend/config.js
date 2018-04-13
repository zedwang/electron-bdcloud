const path = require('path');

const config = new Map();

config.set('db_path', path.join(__dirname, '../db'));

module.exports = config;