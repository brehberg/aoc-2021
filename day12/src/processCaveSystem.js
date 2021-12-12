function processCaveSystem(graphEdges, allowSmall = false) {
  const [graphStart, graphEnd] = ["start", "end"];
  const fullGraph = [];
  for (const [startNode, endNode] of graphEdges) {
    if (startNode !== graphEnd && endNode !== graphStart) {
      fullGraph.push({ start: startNode, end: endNode });
    }
    if (startNode !== graphStart && endNode !== graphEnd) {
      fullGraph.push({ start: endNode, end: startNode });
    }
  }

  const finishedPaths = [];
  findPathsToEnd([graphStart], graphStart, allowSmall);
  return finishedPaths.length;

  function findPathsToEnd(potentialPath, lastNode, allowSmall) {
    const visited = potentialPath.filter((str) => str !== str.toUpperCase());
    const firstVisit = allowSmall && new Set(visited).size === visited.length;

    for (const edge of fullGraph) {
      if (edge.start === lastNode) {
        if (!firstVisit && visited.includes(edge.end)) continue;
        let newPath = [...potentialPath, edge.end];
        edge.end === graphEnd
          ? finishedPaths.push(newPath)
          : findPathsToEnd(newPath, edge.end, allowSmall);
      }
    }
  }
}
exports.processCaveSystem = processCaveSystem;
