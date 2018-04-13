const path = require('path');
const np = require('nedb-promise');
const config  = require('./config');

function db(dbname) {
  return np({
    filename: path.join(config.get('db_path'), dbname),
    autoload: true
  });
}

module.exports = db;