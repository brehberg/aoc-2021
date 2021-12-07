function processCrabPositions(inputPositions, burnRate = "basic") {
  const sorted = inputPositions.sort((a, b) => a - b);
  const maxPosition = sorted[sorted.length - 1];
  const [fuelCost, startPosition] =
    burnRate === "basic" // start will be at or before best position
      ? [basicFuelCost, almostMedian(sorted)]
      : [complexFuelCost, almostAverage(sorted)];
  let minimumFuel = Number.POSITIVE_INFINITY;
  // check each position to find cheapest possible alignment cost
  for (let pos = startPosition; pos <= maxPosition; pos++) {
    const totalFuel = sorted.reduce((sum, cur) => sum + fuelCost(pos, cur), 0);
    if (minimumFuel > totalFuel) minimumFuel = totalFuel;
    else return minimumFuel;
  }
}
exports.processCrabPositions = processCrabPositions;

function basicFuelCost(target, current) {
  return Math.abs(current - target);
}

function complexFuelCost(target, current) {
  const distance = Math.abs(current - target);
  return (distance * (distance + 1)) / 2;
}

function almostMedian(values) {
  return values[Math.ceil(values.length / 2) - 1];
}

function almostAverage(values) {
  return Math.floor(values.reduce((sum, val) => sum + val) / values.length);
}
