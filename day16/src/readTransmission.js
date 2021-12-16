const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readTransmission(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  let someTransmission = "";
  for await (const line of file) {
    someTransmission = line;
  }
  return someTransmission;
}
exports.readTransmission = readTransmission;
