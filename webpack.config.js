const path = require("path");

module.exports = {
  devtool: false,
  entry: {
    "kanji-search": "./dist/kanji-search.js",
    "kanji-search-content-script": "./dist/kanji-search-content-script.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "unpacked"),
  },
};
