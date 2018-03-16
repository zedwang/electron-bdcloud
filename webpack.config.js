let env = process.env.NODE_ENV || 'development'

module.exports = require('./build/webpack.'+ env)