const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    'main': './pages/index.js'
  },
  plugins: [
    new require('copy-webpack-plugin')([
      { from: './pages/index.html' }
    ])
  ],
  // Necessary for file changes inside the bind mount to get picked up
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}