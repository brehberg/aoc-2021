function processStartPosition(inputPositions, useDiracDie = false) {
  const game = useDiracDie
    ? new DiracGame(inputPositions)
    : new FakeGame(inputPositions);
  while (game.stillPlaying()) {
    game.takeTurns();
  }
  return game.finalResult();
}
exports.processStartPosition = processStartPosition;

class DiracGame {
  die = new DiracDie();
  winningScore = 21;
  cachedScore = new Map();
  constructor(input) {
    this.startingGame = {
      players: input.map((space) => new Player(space)),
      nextPlayer: 0,
    };
    this.playerWins = undefined;
  }
  takeTurns(game) {
    // first call will start the game
    if (!game) game = this.startingGame;
    // check for previously cached or currently winning games
    const gameCode = this.hashCode(game);
    if (this.cachedScore.has(gameCode)) return this.cachedScore.get(gameCode);
    if (game.players[0].score >= this.winningScore) return [1, 0];
    if (game.players[1].score >= this.winningScore) return [0, 1];

    // check all roll combinations to determine the winners of future games
    const futureWins = [0, 0];
    for (const [roll, rollCount] of this.die.possibleRolls.entries()) {
      const newPlayers = [
        game.players[0].makeCopy(),
        game.players[1].makeCopy(),
      ];
      newPlayers[game.nextPlayer].move(roll);
      const nextGame = {
        players: newPlayers,
        nextPlayer: 1 - game.nextPlayer,
      };
      const nextGameWins = this.takeTurns(nextGame);
      futureWins[0] += nextGameWins[0] * rollCount;
      futureWins[1] += nextGameWins[1] * rollCount;
    }
    // store and return the results of this games eventual winners
    this.cachedScore.set(gameCode, futureWins);
    this.playerWins = futureWins;
    return futureWins;
  }
  hashCode(game) {
    return (
      game.players[0].space * 10000000 +
      game.players[0].score * 100000 +
      game.players[1].space * 1000 +
      game.players[1].score * 10 +
      game.nextPlayer
    );
  }
  stillPlaying() {
    return !this.playerWins;
  }
  finalResult() {
    return Math.max(...this.playerWins);
  }
}

class DiracDie {
  possibleRolls = new Map();
  constructor() {
    // generate all possible combinations for 3 rolls of the dirac die
    const sequence = [];
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        for (let k = 1; k <= 3; k++) {
          sequence.push(i + j + k);
        }
      }
    }
    for (const value of sequence) {
      if (!this.possibleRolls.has(value)) this.possibleRolls.set(value, 0);
      const count = this.possibleRolls.get(value);
      this.possibleRolls.set(value, count + 1);
    }
  }
}

class FakeGame {
  die = new FakeDie();
  winningScore = 1000;
  constructor(input) {
    this.players = input.map((space) => new Player(space));
    this.lastPlayer = 1;
  }
  takeTurns() {
    this.lastPlayer = 1 - this.lastPlayer;
    const roll = this.die.threeRolls();
    this.players[this.lastPlayer].move(roll);
  }
  stillPlaying() {
    return this.players[this.lastPlayer].score < this.winningScore;
  }
  finalResult() {
    return Math.min(...this.players.map((p) => p.score)) * this.die.totalRolls;
  }
}

class FakeDie {
  totalRolls = 0;
  lastValue = 100;
  nextRoll() {
    this.totalRolls += 1;
    this.lastValue += 1;
    if (this.lastValue > 100) this.lastValue = 1;
    return this.lastValue;
  }
  threeRolls() {
    return this.nextRoll() + this.nextRoll() + this.nextRoll();
  }
}

class Player {
  score = 0;
  space = 0;
  constructor(input, score = 0) {
    this.space = input;
    this.score = score;
  }
  move(rolled) {
    this.space += rolled;
    if (this.space > 10) this.space = ((this.space - 1) % 10) + 1;
    this.score += this.space;
  }
  makeCopy() {
    return new Player(this.space, this.score);
  }
}
