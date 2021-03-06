function processSyntaxChunks(syntaxInput, handleIncomplete = false) {
  const symbolStack = initializeSymbolStack();
  for (const currentLine of syntaxInput) {
    let incompleteLine = symbolStack.startNewLine();
    for (const character of currentLine) {
      incompleteLine = symbolStack.handleSymbol(character);
      if (!incompleteLine) break; // current line is corrupt, halt!
    }
    if (handleIncomplete && incompleteLine)
      symbolStack.computeLineCompletionScore();
  }
  return handleIncomplete
    ? symbolStack.completionScore()
    : symbolStack.syntaxScore();
}
exports.processSyntaxChunks = processSyntaxChunks;

function initializeSymbolStack() {
  const openSymbols = ["(", "[", "{", "<"];
  const closeSymbols = [")", "]", "}", ">"];
  const symbolScores = [3, 57, 1197, 25137];

  let [totalSyntaxScore, stack] = [0, []];
  const completionScores = [];
  return {
    startNewLine: function () {
      stack = [];
      return true;
    },
    handleSymbol: function (symbol) {
      let corruptedLine = false;
      if (openSymbols.includes(symbol)) {
        stack.push(symbol);
      } else if (closeSymbols.includes(symbol)) {
        const index = closeSymbols.indexOf(symbol);
        const latestOpen = stack.pop();
        if (latestOpen !== openSymbols[index]) {
          totalSyntaxScore += symbolScores[index];
          corruptedLine = true;
        }
      }
      return !corruptedLine;
    },
    computeLineCompletionScore: function () {
      // symbols must be popped (removed from end of array)
      const score = stack.reduceRight((total, symbol) => {
        return total * 5 + openSymbols.indexOf(symbol) + 1;
      }, 0);
      completionScores.push(score);
    },
    completionScore: function () {
      const middle = Math.floor(completionScores.length / 2);
      return completionScores.sort((a, b) => a - b)[middle];
    },
    syntaxScore: function () {
      return totalSyntaxScore;
    },
  };
}
