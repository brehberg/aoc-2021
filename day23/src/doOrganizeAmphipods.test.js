const { doOrganizeAmphipodsPart1 } = require("./doOrganizeAmphipods.js");
const { doOrganizeAmphipodsPart2 } = require("./doOrganizeAmphipods.js");
const { BurrowState } = require("./processRoomDiagram.js");

describe("Day 23: Amphipod", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("the last Amber amphipod moves into its room", async () => {
    const burrow = new BurrowState({
      hallway: [".", ".", ".", ".", ".", ".", ".", ".", ".", "A", "."],
      rooms: [["A"], ["B", "B"], ["C", "C"], ["D", "D"]],
    });
    result = burrow.makeMoves(new Map(), true);
    const expectedResult = 8;
    expect(result).toEqual(expectedResult);
  });

  test("both Desert amphipods move into the rightmost room", async () => {
    const burrow = new BurrowState({
      hallway: [".", ".", ".", ".", ".", "D", ".", "D", ".", "A", "."],
      rooms: [["A"], ["B", "B"], ["C", "C"], []],
    });
    result = burrow.makeMoves(new Map(), true);
    const expectedResult = 8 + 7000;
    expect(result).toEqual(expectedResult);
  });

  test("both amphipods in the rightmost room move into the hallway", async () => {
    const burrow = new BurrowState({
      hallway: [".", ".", ".", ".", ".", "D", ".", ".", ".", ".", "."],
      rooms: [["A"], ["B", "B"], ["C", "C"], ["D", "A"]],
    });
    result = burrow.makeMoves(new Map(), true);
    const expectedResult = 8 + 7000 + 2003;
    expect(result).toEqual(expectedResult);
  });

  test("the leftmost Bronze amphipod moves to its room", async () => {
    const burrow = new BurrowState({
      hallway: [".", ".", ".", ".", ".", "D", ".", ".", ".", ".", "."],
      rooms: [["B", "A"], ["B"], ["C", "C"], ["D", "A"]],
    });
    result = burrow.makeMoves(new Map(), true);
    const expectedResult = 8 + 7000 + 2003 + 40;
    expect(result).toEqual(expectedResult);
  });

  test("Desert amphipod moves out of the way and Bronze takes its place", async () => {
    const burrow = new BurrowState({
      hallway: [".", ".", ".", "B", ".", ".", ".", ".", ".", ".", "."],
      rooms: [["B", "A"], ["D"], ["C", "C"], ["D", "A"]],
    });
    result = burrow.makeMoves(new Map(), true);
    const expectedResult = 8 + 7000 + 2003 + 40 + 3030;
    expect(result).toEqual(expectedResult);
  });

  test("the only Copper amphipod not in its room moves there", async () => {
    const burrow = new BurrowState({
      hallway: [".", ".", ".", "B", ".", ".", ".", ".", ".", ".", "."],
      rooms: [["B", "A"], ["C", "D"], ["C"], ["D", "A"]],
    });
    result = burrow.makeMoves(new Map(), true);
    const expectedResult = 8 + 7000 + 2003 + 40 + 3030 + 400;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check example data", async () => {
    const result = await doOrganizeAmphipodsPart1(testFile);
    const expectedResult = 12521;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doOrganizeAmphipodsPart2(testFile);
    const expectedResult = 44169;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doOrganizeAmphipodsPart1(realFile);
    const expectedResult = 11120;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doOrganizeAmphipodsPart2(realFile);
    const expectedResult = 49232;
    expect(result).toEqual(expectedResult);
  });
});
