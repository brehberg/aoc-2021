const { doSimulateFlashesPart1 } = require("./doSimulateFlashes.js");
const { doSimulateFlashesPart2 } = require("./doSimulateFlashes.js");

describe("Day 11: Dumbo Octopus", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check example data", async () => {
    const result = await doSimulateFlashesPart1(testFile);
    const expectedResult = 1656;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doSimulateFlashesPart2(testFile);
    const expectedResult = 195;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doSimulateFlashesPart1(realFile);
    const expectedResult = 1585;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doSimulateFlashesPart2(realFile);
    const expectedResult = 382;
    expect(result).toEqual(expectedResult);
  });
});
