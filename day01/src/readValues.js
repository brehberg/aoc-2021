const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readValues(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const values = [];
  for await (const line of file) {
    values.push(parseInt(line));
  }
  return values;
}
exports.readValues = readValues;
