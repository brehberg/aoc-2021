const { doDecodePacketsPart1 } = require("./doDecodePackets.js");
const { doDecodePacketsPart2 } = require("./doDecodePackets.js");
const { processTransmission } = require("./processTransmission.js");

describe("Day 16: Packet Decoder", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: single literal packet", async () => {
    const hexString = "D2FE28";
    const result = processTransmission(hexString).version;
    const expectedResult = 6;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: nested operator packets", async () => {
    const hexString = "8A004A801A8002F478";
    const result = processTransmission(hexString).version;
    const expectedResult = 16;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: subpackets with two literals", async () => {
    const hexString = "620080001611562C8802118E34";
    const result = processTransmission(hexString).version;
    const expectedResult = 12;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: more subpackets with literals", async () => {
    const hexString = "C0015000016115A2E0802F182340";
    const result = processTransmission(hexString).version;
    const expectedResult = 23;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: finds the sum of 1 and 2", async () => {
    const hexString = "C200B40A82";
    const result = processTransmission(hexString).value;
    const expectedResult = 3;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: finds the product of 6 and 9", async () => {
    const hexString = "04005AC33890";
    const result = processTransmission(hexString).value;
    const expectedResult = 54;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: finds the minimum of 7, 8, and 9", async () => {
    const hexString = "880086C3E88112";
    const result = processTransmission(hexString).value;
    const expectedResult = 7;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: finds the maximum of 7, 8, and 9", async () => {
    const hexString = "CE00C43D881120";
    const result = processTransmission(hexString).value;
    const expectedResult = 9;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: because 5 is less than 15", async () => {
    const hexString = "D8005AC2A8F0";
    const result = processTransmission(hexString).value;
    const expectedResult = 1;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: because 5 is not greater than 15", async () => {
    const hexString = "F600BC2D8F";
    const result = processTransmission(hexString).value;
    const expectedResult = 0;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: because 5 is not equal to 15", async () => {
    const hexString = "9C005AC2F8F0";
    const result = processTransmission(hexString).value;
    const expectedResult = 0;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: because  1 + 3 = 2 * 2", async () => {
    const hexString = "9C0141080250320F1802104A08";
    const result = processTransmission(hexString).value;
    const expectedResult = 1;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check example data", async () => {
    const result = await doDecodePacketsPart1(testFile);
    const expectedResult = 31;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doDecodePacketsPart2(testFile);
    const expectedResult = 54;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doDecodePacketsPart1(realFile);
    const expectedResult = 963;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doDecodePacketsPart2(realFile);
    const expectedResult = 1549026292886;
    expect(result).toEqual(expectedResult);
  });
});
