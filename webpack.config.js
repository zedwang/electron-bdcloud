let env = process.env.NODE_ENV || 'dev'

module.exports = require('./build/webpack.'+ env.substr(0,4))