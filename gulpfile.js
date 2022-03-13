const { src, dest, series } = require("gulp");
const { writeFile } = require("fs").promises;

const DEST_DIR = "unpacked";

const copyManifest = () => src("src/manifest.json").pipe(dest(`${DEST_DIR}/`));

const copyAssets = () => src("src/assets/*").pipe(dest(`${DEST_DIR}/assets/`));

const writeReadMe = () =>
  writeFile("unpacked/README.md", "THIS FOLDER IS AUTO GENERATED, DO NOT MODIFY ANYTHING HERE.");

exports.default = series(copyManifest, copyAssets, writeReadMe);
