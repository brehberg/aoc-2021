const { doLocateBeaconsPart1 } = require("./doLocateBeacons.js");
const { doLocateBeaconsPart2 } = require("./doLocateBeacons.js");

describe("Day 19: Beacon Scanner", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check example data", async () => {
    const result = await doLocateBeaconsPart1(testFile);
    const expectedResult = 79;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doLocateBeaconsPart2(testFile);
    const expectedResult = 3621;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doLocateBeaconsPart1(realFile);
    const expectedResult = 381;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doLocateBeaconsPart2(realFile);
    const expectedResult = 12201;
    expect(result).toEqual(expectedResult);
  });
});
