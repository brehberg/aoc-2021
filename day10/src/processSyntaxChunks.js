const openSymbols = ["(", "[", "{", "<"];
const closeSymbols = [")", "]", "}", ">"];
const symbolScores = [3, 57, 1197, 25137];

function processSyntaxChunks(syntaxInput, handleIncomplete = false) {
  let totalSyntaxScore = 0;
  const completionScores = [];

  for (const currentLine of syntaxInput) {
    let currentLineScore = 0;
    const symbolStack = [];
    for (const character of currentLine) {
      currentLineScore = handleSymbol(character, symbolStack);
      if (currentLineScore) {
        totalSyntaxScore += currentLineScore;
        break; // current line is corrupt, halt!
      }
    }
    if (handleIncomplete && !currentLineScore)
      completionScores.push(completeLineScore(symbolStack));
  }

  const completionScore = middleScore(completionScores);
  return handleIncomplete ? completionScore : totalSyntaxScore;
}
exports.processSyntaxChunks = processSyntaxChunks;

function handleSymbol(symbol, stack) {
  if (openSymbols.includes(symbol)) {
    stack.unshift(symbol);
  } else if (closeSymbols.includes(symbol)) {
    const symbolIndex = closeSymbols.indexOf(symbol);
    const lastSymbol = stack.shift();
    if (lastSymbol !== openSymbols[symbolIndex]) {
      return symbolScores[symbolIndex];
    }
  }
}

function completeLineScore(stack) {
  return stack.reduce((total, symbol) => {
    return total * 5 + openSymbols.indexOf(symbol) + 1;
  }, 0);
}

function middleScore(scores) {
  const middle = parseInt(scores.length / 2);
  return scores.sort((a, b) => a - b)[middle];
}
