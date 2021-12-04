function processNumbersAndBoards(input, winner = "first") {
  const winningRows = [
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

  const [flatBoards, markedValues] = [[], []];
  input.boards.forEach((rawBoard) => {
    flatBoards.push(rawBoard.flat());
    markedValues.push(Array(25).fill(false));
  });

  for (const number of input.numbers) {
    // mark all bingo boards as each number is drawn
    flatBoards.forEach((flatBoard, boardIndex) => {
      const position = flatBoard.indexOf(number);
      if (position !== -1) markedValues[boardIndex][position] = true;
    });

    // check each board to see if any winning row has been marked
    for (const [boardIndex, markedBoard] of markedValues.entries()) {
      for (const winRow of winningRows) {
        // determine total marked values for this row (5 is a winner)
        const checkWinningRow = markedBoard.filter(
          (flag, position) => winRow.includes(position) && flag
        );
        if (checkWinningRow.length !== 5) continue;

        // calculate the result when looking for first win or last board
        // otherwise remove the current winning board from consideration
        if (winner === "first" || flatBoards.length === 1) {
          const sum_of_unmarked = flatBoards[boardIndex]
            .filter((value, index) => !markedBoard[index])
            .reduce((partial, value) => partial + value);
          return number * sum_of_unmarked;
        } else {
          flatBoards.splice(boardIndex, 1);
          markedValues.splice(boardIndex, 1);
        }
      }
    }
  }
  return -1; // no winner was found
}
exports.processNumbersAndBoards = processNumbersAndBoards;
