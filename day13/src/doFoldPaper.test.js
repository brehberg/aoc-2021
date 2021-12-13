const { doFoldPaperPart1 } = require("./doFoldPaper.js");
const { doFoldPaperPart2 } = require("./doFoldPaper.js");

describe("Day 13: Transparent Origami", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check example data", async () => {
    const result = await doFoldPaperPart1(testFile);
    const expectedResult = `17`;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doFoldPaperPart2(testFile);
    const expectedResult = `16
    #####
    #   #
    #   #
    #   #
    #####`;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doFoldPaperPart1(realFile);
    const expectedResult = `621`;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doFoldPaperPart2(realFile);
    const expectedResult = `95
    #  # #  # #  #   ##  ##   ##    ## ####
    #  # # #  #  #    # #  # #  #    #    #
    #### ##   #  #    # #    #  #    #   # 
    #  # # #  #  #    # # ## ####    #  #  
    #  # # #  #  # #  # #  # #  # #  # #   
    #  # #  #  ##   ##   ### #  #  ##  ####`;
    expect(result).toEqual(expectedResult);
  });
});
