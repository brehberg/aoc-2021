function processRebootSteps(rebootSteps, initOnly = true) {
  let activeRegions = [];
  for (const command of rebootSteps) {
    if (initOnly && noOverlap(command, initRegion)) continue;
    // add the new region only for activate (on) commands
    const newRegions =
      command.action === "on" ? [createNewRegion(command)] : [];
    for (const region of activeRegions) {
      // keep existing region intact when no overlap with new region
      if (noOverlap(command, region)) {
        newRegions.push(region);
        continue;
      }
      // keep smaller regions that exclude new region (avoid overlap)
      if (command.x.max < region.x.max)
        newRegions.push(keepRegionToRight(command, region));
      if (command.x.min > region.x.min)
        newRegions.push(keepRegionToLeft(command, region));
      if (command.y.max < region.y.max)
        newRegions.push(keepRegionAbove(command, region));
      if (command.y.min > region.y.min)
        newRegions.push(keepRegionBelow(command, region));
      if (command.z.max < region.z.max)
        newRegions.push(keepRegionBehind(command, region));
      if (command.z.min > region.z.min)
        newRegions.push(keepRegionInFront(command, region));
    }
    activeRegions = newRegions;
  }
  return activeRegions.reduce((count, r) => count + volume(r), 0);
}
exports.processRebootSteps = processRebootSteps;

const noOverlap = (newRegion, testRegion) => {
  return (
    newRegion.x.min > testRegion.x.max ||
    newRegion.x.max < testRegion.x.min ||
    newRegion.y.min > testRegion.y.max ||
    newRegion.y.max < testRegion.y.min ||
    newRegion.z.min > testRegion.z.max ||
    newRegion.z.max < testRegion.z.min
  );
};
const createNewRegion = (command) => {
  return {
    x: { min: command.x.min, max: command.x.max },
    y: { min: command.y.min, max: command.y.max },
    z: { min: command.z.min, max: command.z.max },
  };
};
const keepRegionToRight = (newRegion, existing) => {
  return {
    x: { min: newRegion.x.max + 1, max: existing.x.max },
    y: { min: existing.y.min, max: existing.y.max },
    z: { min: existing.z.min, max: existing.z.max },
  };
};
const keepRegionToLeft = (newRegion, existing) => {
  return {
    x: { min: existing.x.min, max: newRegion.x.min - 1 },
    y: { min: existing.y.min, max: existing.y.max },
    z: { min: existing.z.min, max: existing.z.max },
  };
};
const keepRegionAbove = (newRegion, existing) => {
  return {
    x: {
      // Left and Right regions on X axis aready coveredv
      min: Math.max(existing.x.min, newRegion.x.min),
      max: Math.min(existing.x.max, newRegion.x.max),
    },
    y: { min: newRegion.y.max + 1, max: existing.y.max },
    z: { min: existing.z.min, max: existing.z.max },
  };
};
const keepRegionBelow = (newRegion, existing) => {
  return {
    x: {
      // Left and Right regions on X axis aready covered
      min: Math.max(existing.x.min, newRegion.x.min),
      max: Math.min(existing.x.max, newRegion.x.max),
    },
    y: { min: existing.y.min, max: newRegion.y.min - 1 },
    z: { min: existing.z.min, max: existing.z.max },
  };
};
const keepRegionBehind = (newRegion, existing) => {
  return {
    x: {
      // Left and Right regions on X axis aready covered
      min: Math.max(existing.x.min, newRegion.x.min),
      max: Math.min(existing.x.max, newRegion.x.max),
    },
    y: {
      // Below and Above regions on Y axis already covered
      min: Math.max(existing.y.min, newRegion.y.min),
      max: Math.min(existing.y.max, newRegion.y.max),
    },
    z: { min: newRegion.z.max + 1, max: existing.z.max },
  };
};
const keepRegionInFront = (newRegion, existing) => {
  return {
    x: {
      // Left and Right regions on X axis aready covered
      min: Math.max(existing.x.min, newRegion.x.min),
      max: Math.min(existing.x.max, newRegion.x.max),
    },
    y: {
      // Below and Above regions on Y axis already covered
      min: Math.max(existing.y.min, newRegion.y.min),
      max: Math.min(existing.y.max, newRegion.y.max),
    },
    z: { min: existing.z.min, max: newRegion.z.min - 1 },
  };
};
const volume = (region) => {
  return (
    (region.x.max - region.x.min + 1) *
    (region.y.max - region.y.min + 1) *
    (region.z.max - region.z.min + 1)
  );
};
const initRegion = {
  x: { min: -50, max: 50 },
  y: { min: -50, max: 50 },
  z: { min: -50, max: 50 },
};
