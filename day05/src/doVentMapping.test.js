const { doVentMappingPart1 } = require("./doVentMapping.js");
const { doVentMappingPart2 } = require("./doVentMapping.js");

describe("Day 5: Hydrothermal Venture", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check example data", async () => {
    const result = await doVentMappingPart1(testFile);
    const expectedResult = 5;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doVentMappingPart2(testFile);
    const expectedResult = 12;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doVentMappingPart1(realFile);
    const expectedResult = 6572;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doVentMappingPart2(realFile);
    const expectedResult = 21466;
    expect(result).toEqual(expectedResult);
  });
});
