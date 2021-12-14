function processPolymerFormula(inputFormula, maxStep = 4) {
  // start with all pairs from the polymer template
  let pairs = new PolymerPairs();
  for (const [index, char] of inputFormula.template.entries()) {
    if (index === inputFormula.template.length - 1) break;
    const pair = char + inputFormula.template[index + 1];
    pairs.addPair(pair);
  }
  // for each step determine new pairs based on insertion rules
  for (let step = 0; step < maxStep; step++) {
    const newPairs = new PolymerPairs();
    for (const pair in pairs.pairList) {
      const rule = inputFormula.rules.find((rule) => rule[0] === pair);
      const pair1 = rule[0][0] + rule[1];
      const pair2 = rule[1] + rule[0][1];
      const count = pairs.pairList[pair];
      newPairs.addPair(pair1, count);
      newPairs.addPair(pair2, count);
    }
    pairs = newPairs;
  }
  // count second char from all final pairs plus first template char
  const result = new PolymerPairs();
  result.addPair(inputFormula.template[0], 1);
  for (const pair in pairs.pairList) {
    const count = pairs.pairList[pair];
    result.addPair(pair[1], count);
  }
  // subtract least common quantity from most common quantity
  let most = 0;
  let least = Infinity;
  for (const element in result.pairList) {
    const count = result.pairList[element];
    most = Math.max(most, count);
    least = Math.min(least, count);
  }
  return most - least;
}
exports.processPolymerFormula = processPolymerFormula;

class PolymerPairs {
  pairList = {};
  addPair(pair, count = 1) {
    if (!this.pairList[pair]) {
      this.pairList[pair] = count;
    } else {
      this.pairList[pair] += count;
    }
  }
}
