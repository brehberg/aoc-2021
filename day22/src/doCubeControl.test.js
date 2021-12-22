const { doCubeControlPart1 } = require("./doCubeControl.js");
const { doCubeControlPart2 } = require("./doCubeControl.js");

describe("Day 22: Reactor Reboot", () => {
  const smallFile = `${__dirname}/../data/basic.txt`;
  const testFile = `${__dirname}/../data/example.txt`;
  const test2File = `${__dirname}/../data/example2.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check basic data", async () => {
    const result = await doCubeControlPart1(smallFile);
    const expectedResult = 39;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check example data", async () => {
    const result = await doCubeControlPart1(testFile);
    const expectedResult = 590784;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check example 2 data", async () => {
    const result = await doCubeControlPart1(test2File);
    const expectedResult = 474140;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example 2 data", async () => {
    const result = await doCubeControlPart2(test2File);
    const expectedResult = 2758514936282235;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doCubeControlPart1(realFile);
    const expectedResult = 620241;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doCubeControlPart2(realFile);
    const expectedResult = 1284561759639324;
    expect(result).toEqual(expectedResult);
  });
});
