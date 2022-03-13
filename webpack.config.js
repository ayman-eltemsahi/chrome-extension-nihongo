const path = require('path');

module.exports = {
  devtool: false,
  entry: {
    'kanji-search': './dist/kanji-search.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'unpacked')
  }
};
