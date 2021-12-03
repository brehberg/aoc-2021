const { doBinaryDiagnosticPart1 } = require("./doBinaryDiagnostic.js");
const { doBinaryDiagnosticPart2 } = require("./doBinaryDiagnostic.js");

describe("Day 3: Binary Diagnostic", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check example data", async () => {
    const result = await doBinaryDiagnosticPart1(testFile);
    const expectedResult = 198;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doBinaryDiagnosticPart2(testFile);
    const expectedResult = 230;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doBinaryDiagnosticPart1(realFile);
    const expectedResult = 3148794;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doBinaryDiagnosticPart2(realFile);
    const expectedResult = 2795310;
    expect(result).toEqual(expectedResult);
  });
});
