function processCrabPositions(inputPositions, burnRate = "basic") {
  const maxPosition = Math.max(...inputPositions);
  const fuelCost = burnRate === "basic" ? basicFuelCost : complexFuelCost;
  let minimumFuel = Number.POSITIVE_INFINITY;
  // check each position to find cheapest possible alignment cost
  for (let target = 0; target <= maxPosition; target++) {
    const totalFuel = inputPositions.reduce(
      (sum, current) => sum + fuelCost(target, current), 0);
    if (minimumFuel > totalFuel) minimumFuel = totalFuel;
  }
  return minimumFuel;
}
exports.processCrabPositions = processCrabPositions;

function basicFuelCost(target, current) {
  return Math.abs(current - target);
}

function complexFuelCost(target, current) {
  const distance = Math.abs(current - target);
  return (distance * (distance + 1)) / 2;
}
