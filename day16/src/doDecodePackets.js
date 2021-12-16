const { readTransmission } = require("./readTransmission.js");
const { processTransmission } = require("./processTransmission.js");

async function doPart1(fileName) {
  const data = await readTransmission(fileName);
  return processTransmission(data).version;
}
exports.doDecodePacketsPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readTransmission(fileName);
  return processTransmission(data).value;
}
exports.doDecodePacketsPart2 = doPart2;
