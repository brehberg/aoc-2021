const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readPolymerFormula(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const polymerFormula = { template: [], rules: [] };
  for await (const line of file) {
    // first line of input offers a polymer template
    if (line && !polymerFormula.template.length)
      polymerFormula.template.push(...line.split(""));
    // other lines are a list of pair insertion rules
    else if (line) polymerFormula.rules.push(line.match(/\w+/g));
  }
  return polymerFormula;
}
exports.readPolymerFormula = readPolymerFormula;
