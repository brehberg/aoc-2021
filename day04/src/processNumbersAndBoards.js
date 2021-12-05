function processNumbersAndBoards(input, winner = "first") {
  const possibleLines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
  ];

  const bingoBoards = [];
  input.boards.forEach((rawBoard) => {
    bingoBoards.push({
      flatValues: rawBoard.flat(),
      markedValues: Array(25).fill(false),
    });
  });

  for (const drawnNumber of input.numbers) {
    // mark all bingo boards as each number is drawn
    bingoBoards.forEach((bingoBoard) => {
      const position = bingoBoard.flatValues.indexOf(drawnNumber);
      if (position !== -1) bingoBoard.markedValues[position] = true;
    });

    // check each board to see if any winning line has been marked
    for (const [boardIndex, currentBoard] of bingoBoards.entries()) {
      for (const thisLine of possibleLines) {
        // validate total marked values for this line (5 is a winner)
        const checkWinningLine = currentBoard.markedValues.filter(
          (flag, position) => flag && thisLine.includes(position)
        );
        if (checkWinningLine.length !== 5) continue;

        // calculate the result when finding the first win or last board
        // otherwise remove the current winning board from consideration
        if (winner === "first" || bingoBoards.length === 1) {
          const sumOfunmarkedValues = currentBoard.flatValues
            .filter((value, index) => !currentBoard.markedValues[index])
            .reduce((partialSum, value) => partialSum + value, 0);
          return drawnNumber * sumOfunmarkedValues;
        } else {
          bingoBoards.splice(boardIndex, 1);
        }
      }
    }
  }
  return -1; // no winner was found
}
exports.processNumbersAndBoards = processNumbersAndBoards;
