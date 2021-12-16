function processTransmission(hexString) {
  const bitString = hexString
    .split("")
    .map((str) => parseInt(str, 16).toString(2).padStart(4, "0"))
    .join("");

  const versions = [];
  let number = 0;
  parsePacket(bitString);
  return { version: versions.reduce((s, v) => s + v, 0), value: number };

  function parsePacket(input) {
    let binary = new BitString(input);
    const vers = binary.getNumber(3);
    const type = binary.getNumber(3);
    versions.push(vers);
    let flag = binary.getNumber(1);

    // decode literal value packet
    if (type === 4) {
      let digits = "";
      while (flag === 1) {
        digits += binary.getText(4);
        flag = binary.getNumber(1);
      }
      digits += binary.getText(4);
      number = parseInt(digits, 2);
      return binary.str;
    }

    // decode operator packets
    let results = [];
    if (flag === 0) {
      // handle total length of the sub-packets
      const length = binary.getNumber(15);
      let subpacketText = binary.getText(length);
      while (subpacketText.length) {
        subpacketText = parsePacket(subpacketText);
        results.push(number);
      }
    } else {
      // handle number of sub-packets contained
      const count = binary.getNumber(11);
      let remainingText = binary.str;
      for (let i = 0; i < count; i++) {
        remainingText = parsePacket(remainingText);
        results.push(number);
      }
      binary = new BitString(remainingText);
    }
    // compute value of operator expression
    if (type === 0) {
      number = results.reduce((sum, v) => sum + v, 0);
    } else if (type === 1) {
      number = results.reduce((prod, v) => prod * v, 1);
    } else if (type === 2) {
      number = Math.min(...results);
    } else if (type === 3) {
      number = Math.max(...results);
    } else if (type === 5) {
      number = Number(results[0] > results[1]);
    } else if (type === 6) {
      number = Number(results[0] < results[1]);
    } else if (type === 7) {
      number = Number(results[0] === results[1]);
    }
    return binary.str;
  }
}
exports.processTransmission = processTransmission;

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
}
