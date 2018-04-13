const path = require('path');

const config = new Map();

config.set('webpack.port', process.env.PORT || 8597);
config.set('webpack.host', 'localhost');
config.set('api.port', process.env.API_PORT || 9000);
config.set('dir.src', 'src');
config.set('dir.dist', 'package');
config.set('dir.test', 'test');

// -----------------------------------
// API
// -----------------------------------
config.set('api.port', 9527);

// -----------------------------------
// Webpack
// -----------------------------------
config.set('webpack.public.path',
  `http://${config.get('webpack.host')}:${config.get('webpack.port')}/`
);

// ------------------------------------
// Project
// ------------------------------------
config.set('path.project', path.resolve(__dirname, '../'));

// ------------------------------------
// Utilities
// ------------------------------------
const paths = (() => {
  const base    = [config.get('path.project')];
  const resolve = path.resolve;
  
  const project = (...args) => resolve.apply(resolve, [...base, ...args]);
  
  return {
    project : project,
    src     : project.bind(null, config.get('dir.src')),
    dist    : project.bind(null, config.get('dir.dist'))
  };
})();
  
config.set('utils.paths', paths);

module.exports = config;