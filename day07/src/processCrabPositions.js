function processCrabPositions(someCrabPositions, burnRate = "basic") {
  fuelCosts = Array(Math.max(...someCrabPositions) + 1).fill(0);
  for (let target = 0; target < fuelCosts.length; target++) {
    for (const current of someCrabPositions) {
      fuelCosts[target] +=
        burnRate === "basic"
          ? basicFuelCost(target, current)
          : complexFuelCost(current, target);
    }
  }
  return Math.min(...fuelCosts);
}
exports.processCrabPositions = processCrabPositions;

function basicFuelCost(target, current) {
  return Math.abs(current - target);
}

function complexFuelCost(current, target) {
  const [start, end] =
    current <= target ? [current, target] : [target, current];
  let totalCost = 0;
  for (let offset = start; offset < end; offset++) {
    totalCost += 1 + offset - start;
  }
  return totalCost;
}
