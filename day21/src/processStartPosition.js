function processStartPosition(inputPositions, doPrint, useDiracDie = false) {
  const game = useDiracDie
    ? new RealGame(inputPositions)
    : new PracticeGame(inputPositions);
  while (game.stillPlaying()) {
    game.takeTurns();
  }
  doPrint && console.log(game.printResults());
  return game.finalResult();
}
exports.processStartPosition = processStartPosition;

class RealGame {
  // use 3-sided quantum die (splits the universe for each outcome)
  die = new DiracDie();
  winningScore = 21;
  constructor(input) {
    this.startingGame = {
      players: input.map((p) => new Player(p.name, p.position)),
      nextPlayer: 0,
    };
    this.playerWins = Array(input.length).fill(0);
    this.cachedScore = new Map();
  }
  takeTurns(game) {
    // first call to take turns will start the real game
    if (!game) game = this.startingGame;
    // check for previously cached or currently winning games
    const gameCode = this.hashCode(game);
    if (this.cachedScore.has(gameCode)) return this.cachedScore.get(gameCode);
    if (game.players[0].score >= this.winningScore) return [1, 0];
    if (game.players[1].score >= this.winningScore) return [0, 1];

    // check all roll combinations to determine the winners of future games
    const futureWins = Array(this.playerWins.length).fill(0);
    for (const [roll, rollCount] of this.die.possibleRolls.entries()) {
      const nextGame = {
        players: game.players.map((p) => p.makeCopy()),
        nextPlayer: 1 - game.nextPlayer,
      };
      nextGame.players[game.nextPlayer].move(roll);
      const nextGameWins = this.takeTurns(nextGame);
      for (let i = 0; i < futureWins.length; i++) {
        futureWins[i] += nextGameWins[i] * rollCount;
      }
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
    return !this.cachedScore.size;
  }
  finalResult() {
    return Math.max(...this.playerWins);
  }
  printResults() {
    const totalGames = this.playerWins.reduce((sum, p) => sum + p, 0);
    this.startingGame.players.forEach((p, index) => {
      p.score = Math.round((this.playerWins[index] / totalGames) * 100);
    });
    this.startingGame.players.sort((a, b) => b.score - a.score);
    const winner = this.startingGame.players[0];
    const loser = this.startingGame.players[1];
    return (
      `\nAfter ${totalGames} universes have been created:` +
      `\n${winner.name} wins more in ${winner.score}% of the games.` +
      `\n${loser.name} lost more in ${loser.score}% of the games.`
    );
  }
}
class DiracDie {
  possibleRolls = new Map();
  constructor() {
    // generate all possible combinations for 3 rolls of the dirac die
    const threeRollSequences = [];
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        for (let k = 1; k <= 3; k++) {
          threeRollSequences.push(i + j + k);
        }
      }
    }
    for (const value of threeRollSequences) {
      if (!this.possibleRolls.has(value)) this.possibleRolls.set(value, 0);
      const count = this.possibleRolls.get(value);
      this.possibleRolls.set(value, count + 1);
    }
  }
}
class PracticeGame {
  // use 100-sided deterministic die (always rolls 1, 2, 3... 100)
  die = new FakeDie();
  winningScore = 1000;
  constructor(input) {
    this.players = input.map((p) => new Player(p.name, p.position));
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
  printResults() {
    this.players.sort((a, b) => b.score - a.score);
    const winner = this.players[0];
    const loser = this.players[this.players.length - 1];
    return (
      `\nAfter ${this.die.totalRolls} total rolls of the deterministic die:` +
      `\n${winner.name} wins the game with ${winner.score} points.` +
      `\n${loser.name} lost the game with ${loser.score} points.`
    );
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
  constructor(name, input, score = 0) {
    this.space = input;
    this.score = score;
    this.name = name;
  }
  move(rolled) {
    this.space += rolled;
    if (this.space > 10) this.space = ((this.space - 1) % 10) + 1;
    this.score += this.space;
  }
  makeCopy() {
    return new Player(this.name, this.space, this.score);
  }
}
