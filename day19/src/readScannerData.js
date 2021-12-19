const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readScannerData(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const someScannerData = [];
  let currentScanner = undefined;
  for await (const line of file) {
    if (!line) {
      // blank line marks end of current scanner report
      currentScanner && someScannerData.push(currentScanner);
      currentScanner = undefined;
    } else if (line.includes("scanner")) {
      // header line makrs starts of a new scanner report
      const regexMatch = line.match(/\d+/);
      currentScanner = { number: Number(regexMatch[0]), beacons: [] };
    } else {
      // other lines give relative positions of beacons
      const positions = line.split(",").map(Number);
      positions.length === 3 &&
        currentScanner.beacons.push({
          x: positions[0],
          y: positions[1],
          z: positions[2],
        });
    }
  }
  currentScanner && someScannerData.push(currentScanner);
  return someScannerData;
}
exports.readScannerData = readScannerData;
