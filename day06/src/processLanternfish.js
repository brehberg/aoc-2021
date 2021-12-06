function processLanternfish(someLanternfish, totalDays = 18) {
  const fishCounts = Array(9).fill(0);
  for (const fish of someLanternfish) {
    fishCounts[fish]++;
  }
  for (let day = 0; day < totalDays; day++) {
    const spawn = fishCounts[0];
    for (let i = 0; i < 8; i++) {
      fishCounts[i] = fishCounts[i + 1];
    }
    fishCounts[6] += spawn;
    fishCounts[8] = spawn;
  }
  return fishCounts.reduce((sum, count) => sum + count, 0);
}
exports.processLanternfish = processLanternfish;
