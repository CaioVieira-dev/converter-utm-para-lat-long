const fs = require("fs");
const path = require("path");

module.exports = function parseCsv(fileName, delimiter) {
  const filePath = path.resolve(__dirname, fileName);
  const str = fs.readFileSync(filePath).toString();

  const lines = str.trim().split("\n");

  return lines
    .filter((line) => line.length > 0)
    .map((line) => line.replace('\r', '').split(delimiter));
};