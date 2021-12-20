const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readImageData(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const imageData = { algorithm: "", input: [] };
  for await (const line of file) {
    if (line && !imageData.algorithm) imageData.algorithm = line;
    else if (line) imageData.input.push(line.split(""));
  }
  return imageData;
}
exports.readImageData = readImageData;
