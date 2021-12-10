const { readSyntaxChunks } = require("./readSyntaxChunks.js");
const { processSyntaxChunks } = require("./processSyntaxChunks.js");

async function doPart1(fileName) {
  const data = await readSyntaxChunks(fileName);
  return processSyntaxChunks(data);
}
exports.doDecodeSyntaxPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readSyntaxChunks(fileName);
  return processSyntaxChunks(data, true);
}
exports.doDecodeSyntaxPart2 = doPart2;
