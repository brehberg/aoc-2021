function processTransmission(hexString) {
  const bitString = hexString
    .split("")
    .map((str) => parseInt(str, 16).toString(2).padStart(4, "0"))
    .join("");

  const [versions, number, _] = parsePacket(bitString);
  return { version: versions.reduce((s, v) => s + v, 0), value: number };
}
exports.processTransmission = processTransmission;

const parsePacket = (input) => {
  const binary = new BitString(input);
  const vers = binary.getNumber(3);
  const type = binary.getNumber(3);

  if (type === 4) {
    return decodeLiteral(binary, vers);
  }
  const [versions, results] = decodeOperator(binary, vers);
  return [versions, computeResults(type, results), binary.remaining()];
};

const decodeLiteral = (binary, vers) => {
  // decode literal value packet
  let flag = binary.getNumber(1);
  let digits = binary.getText(4);
  while (flag) {
    flag = binary.getNumber(1);
    digits += binary.getText(4);
  }
  return [[vers], parseInt(digits, 2), binary.remaining()];
};

const decodeOperator = (binary, vers) => {
  // decode operator packet and subpackets
  const flag = binary.getNumber(1);
  const [versions, results] = [[vers], []];
  flag === 0
    ? subpacketsByLength(binary, versions, results)
    : subpacketsByCount(binary, versions, results);
  return [versions, results];
};

const computeResults = (type, results) => {
  // compute value of operator expression
  let result = 0;
  if (type === 0) {
    result = results.reduce((sum, v) => sum + v, 0);
  } else if (type === 1) {
    result = results.reduce((prod, v) => prod * v, 1);
  } else if (type === 2) {
    result = Math.min(...results);
  } else if (type === 3) {
    result = Math.max(...results);
  } else if (type === 5) {
    result = Number(results[0] > results[1]);
  } else if (type === 6) {
    result = Number(results[0] < results[1]);
  } else if (type === 7) {
    result = Number(results[0] === results[1]);
  }
  return result;
};

const subpacketsByLength = (binary, versions, results) => {
  // handle total length of the sub-packets
  let [subversions, number] = [[], 0];
  const length = binary.getNumber(15);
  let subpacketText = binary.getText(length);
  while (subpacketText.length) {
    [subversions, number, subpacketText] = parsePacket(subpacketText);
    versions.push(...subversions);
    results.push(number);
  }
};

const subpacketsByCount = (binary, versions, results) => {
  // handle number of sub-packets contained
  let [subversions, number] = [[], 0];
  const count = binary.getNumber(11);
  let remainingText = binary.remaining();
  for (let i = 0; i < count; i++) {
    [subversions, number, remainingText] = parsePacket(remainingText);
    versions.push(...subversions);
    results.push(number);
  }
  binary.update(remainingText);
};
class BitString {
  constructor(input) {
    this.str = input;
  }
  getNumber(len) {
    return parseInt(this.getText(len), 2);
  }
  getText(len) {
    const value = this.str.substring(0, len);
    this.str = this.str.slice(len);
    return value;
  }
  remaining() {
    return this.str;
  }
  update(newString) {
    this.str = newString;
  }
}
