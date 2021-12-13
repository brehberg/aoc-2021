function processCaveSystem(graphEdges, allowSmallVisit = false) {
  const graph = { start: "start", end: "end", edges: [], paths: [] };
  // add backtrack edges (without return to start or leave from end)
  for (const [startNode, endNode] of graphEdges) {
    if (startNode !== graph.end && endNode !== graph.start) {
      graph.edges.push({ start: startNode, end: endNode });
    }
    if (startNode !== graph.start && endNode !== graph.end) {
      graph.edges.push({ start: endNode, end: startNode });
    }
  }
  findPathsToEnd([graph.start], allowSmallVisit);
  return graph.paths.length;

  function findPathsToEnd(potentialPath, firstVisitAllowed) {
    const lastNode = potentialPath[potentialPath.length - 1];
    const visited = potentialPath.filter((str) => str !== str.toUpperCase());
    // recursive depth first search along valid edges until end is found
    for (const edge of graph.edges) {
      if (edge.start !== lastNode) continue;
      let firstVisitAvailable = firstVisitAllowed;
      if (visited.includes(edge.end)) {
        if (!firstVisitAvailable) continue;
        else firstVisitAvailable = false;
      }
      const newPath = [...potentialPath, edge.end];
      edge.end === graph.end
        ? graph.paths.push(newPath)
        : findPathsToEnd(newPath, firstVisitAvailable);
    }
  }
}
exports.processCaveSystem = processCaveSystem;
