const { readScannerData } = require("./readScannerData.js");
const { processScannerData } = require("./processScannerData.js");

async function doPart1(fileName) {
  const data = await readScannerData(fileName);
  return processScannerData(data);
}
exports.doLocateBeaconsPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readScannerData(fileName);
  return processScannerData(data, true);
}
exports.doLocateBeaconsPart2 = doPart2;
