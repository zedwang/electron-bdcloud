const env = process.env.NODE_ENV || 'development';
console.log('begin '+ env + ' model...');
module.exports = require('./build/webpack.'+ env.trim());