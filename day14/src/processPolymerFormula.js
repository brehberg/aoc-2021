function processPolymerFormula(formula, maxStep = 4) {
  let pairs = initializeFormulaPairs(formula.template);
  for (let step = 0; step < maxStep; step++)
    pairs = applyInsertionRules(pairs, formula.rules);
  const result = collectFinalResults(pairs, formula.template);
  return calculateElementScore(result);
}
exports.processPolymerFormula = processPolymerFormula;

const initializeFormulaPairs = (template) => {
  // start with all pairs from the polymer template
  const pairs = new PolymerPairs();
  for (const [index, char] of template.entries()) {
    if (index === template.length - 1) break;
    const pair = char + template[index + 1];
    pairs.addPair(pair);
  }
  return pairs;
};
const applyInsertionRules = (pairs, rules) => {
  // for each step determine new pairs based on insertion rules
  const newPairs = new PolymerPairs();
  for (const pair in pairs.pairList) {
    const rule = rules.find((rule) => rule[0] === pair);
    const pair1 = rule[0][0] + rule[1];
    const pair2 = rule[1] + rule[0][1];
    const count = pairs.pairList[pair];
    newPairs.addPair(pair1, count);
    newPairs.addPair(pair2, count);
  }
  return newPairs;
};
const collectFinalResults = (pairs, template) => {
  // count second char from all final pairs plus first template char
  const result = new PolymerPairs();
  result.addPair(template[0]);
  for (const pair in pairs.pairList) {
    const count = pairs.pairList[pair];
    result.addPair(pair[1], count);
  }
  return result;
};
const calculateElementScore = (result) => {
  // subtract least common quantity from most common quantity
  let [most, least] = [0, Infinity];
  for (const element in result.pairList) {
    const count = result.pairList[element];
    most = Math.max(most, count);
    least = Math.min(least, count);
  }
  return most - least;
};
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
