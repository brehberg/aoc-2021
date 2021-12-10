const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readSyntaxChunks(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const someSyntaxChunks = [];
  for await (const line of file) {
    someSyntaxChunks.push(line.split(""));
  }
  return someSyntaxChunks;
}
exports.readSyntaxChunks = readSyntaxChunks;
