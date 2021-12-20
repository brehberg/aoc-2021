const { readImageData } = require("./readImageData.js");
const { processImageData } = require("./processImageData.js");

async function doPart1(fileName) {
  const data = await readImageData(fileName);
  return processImageData(data, 2);
}
exports.doImageEnhancementPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readImageData(fileName);
  return processImageData(data, 50);
}
exports.doImageEnhancementPart2 = doPart2;
