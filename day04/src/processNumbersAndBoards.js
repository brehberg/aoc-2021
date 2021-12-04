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

  const BreakException = {};
  let finalScore = 0;
  try {
    input.numbers.forEach((number) => {
      // mark all bingo boards as each number is drawn
      flatBoards.forEach((flatBoard, boardIndex) => {
        const position = flatBoard.indexOf(number);
        if (position != -1) markedValues[boardIndex][position] = true;
      });

      // check if any winning row is marked on any board
      winningRows.forEach((winRow) => {
        markedValues.forEach((markedBoard, boardIndex) => {
          const checkRow = [];
          winRow.forEach((position) => {
            checkRow.push(markedBoard[position]);
          });
          if (checkRow.filter(Boolean).length === 5) {
            // calculate the result when looking for first win or last board
            // otherwise remove the current winning board from consideration
            if (winner === "first" || flatBoards.length === 1) {
              let sum = 0;
              markedBoard.forEach((marked, index) => {
                if (!marked) sum += flatBoards[boardIndex][index];
              });
              finalScore = number * sum;
              throw BreakException;
            } else {
              flatBoards.splice(boardIndex, 1);
              markedValues.splice(boardIndex, 1);
            }
          }
        });
      });
    });
  } catch (e) {
    if (e !== BreakException) throw e;
    return finalScore;
  }
}
exports.processNumbersAndBoards = processNumbersAndBoards;
