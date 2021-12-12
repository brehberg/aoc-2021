function processCaveSystem(graphEdges, allowSmall = false) {
  const fullGraph = [];
  for (const edge of graphEdges) {
    const [startNode, endNode] = [...edge];
    if (startNode !== "end" && endNode !== "start") {
      fullGraph.push({ start: startNode, end: endNode });
    }
    if (startNode !== "start" && endNode !== "end") {
      fullGraph.push({ start: endNode, end: startNode });
    }
  }

  const finishedPaths = [];
  const inProgressPaths = [["start"]];
  while (inProgressPaths.length) {
    const potentialPath = inProgressPaths.shift();
    const lastNode = potentialPath[potentialPath.length - 1];
    const visited = potentialPath.filter((str) => str !== str.toUpperCase());
    const firstVisit = allowSmall && new Set(visited).size === visited.length;

    for (const edge of fullGraph) {
      if (edge.start === lastNode) {
        if (!firstVisit && visited.includes(edge.end)) continue;
        if (edge.end === "end") {
          finishedPaths.push([...potentialPath, edge.end]);
        } else {
          inProgressPaths.push([...potentialPath, edge.end]);
        }
      }
    }
  }
  return finishedPaths.length;
}
exports.processCaveSystem = processCaveSystem;
