import { Position } from "../types";

export function getDistance(a: Position, b: Position) {
  const cSquared = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
  return Math.sqrt(cSquared);
}
