function processPowerConsumption(bitArrays) {
  const [length, width] = [bitArrays.length, bitArrays[0].length];

  const bitCounts = Array(width).fill(0);
  bitArrays.forEach((bitArray) => {
    bitArray.forEach((bit, index) => {
      if (bit === 1) bitCounts[index]++;
    });
  });

  const [gamma, epsilon] = [Array(width).fill(0), Array(width).fill(0)];
  bitCounts.forEach((count, pos) => {
    count >= length / 2 ? (gamma[pos] = 1) : (epsilon[pos] = 1);
  });
  return parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2);
}
exports.processPowerConsumption = processPowerConsumption;

function processLifeSupportRating(bitArrays) {
  const oxygen = determineRating(bitArrays);
  const co2 = determineRating(bitArrays, 0);

  return parseInt(oxygen.join(""), 2) * parseInt(co2.join(""), 2);

  function determineRating(workArea, tieBreak = 1) {
    let [length, position] = [workArea.length, 0];

    while (length > 1) {
      let bitCount = 0;
      workArea.forEach((bitArray) => {
        if (bitArray[position] === 1) bitCount++;
      });
      const bitCriteria = bitCount >= length / 2 ? tieBreak : 1 - tieBreak;

      const keepers = [];
      workArea.forEach((bitArray) => {
        if (bitArray[position] === bitCriteria) keepers.push(bitArray);
      });
      workArea = keepers;
      length = workArea.length;
      position++;
    }
    return workArea[0];
  }
}
exports.processLifeSupportRating = processLifeSupportRating;
