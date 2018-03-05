let env = 'dev'
if (process.env.NODE_ENV === 'production') {
	env = 'prod'
}
module.exports = require('./build/webpack.'+ env)