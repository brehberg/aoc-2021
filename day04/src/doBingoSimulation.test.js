const { doBingoSimulationPart1 } = require("./doBingoSimulation.js");
const { doBingoSimulationPart2 } = require("./doBingoSimulation.js");

describe("Day 4: Giant Squid", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check example data", async () => {
    const result = await doBingoSimulationPart1(testFile);
    const expectedResult = 4512;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doBingoSimulationPart2(testFile);
    const expectedResult = 1924;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doBingoSimulationPart1(realFile);
    const expectedResult = 58412;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doBingoSimulationPart2(realFile);
    const expectedResult = 10030;
    expect(result).toEqual(expectedResult);
  });
});
