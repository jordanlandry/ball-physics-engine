import { CENTER_X, CENTER_Y, WIDTH, drawCircle } from "./canvas";
import { properties } from "./properties";

const margin = 25;

export const outterCircle = {
  position: { x: CENTER_X, y: CENTER_Y },
  fill: properties.outterFillColor,
  stroke: properties.outterStrokeColor,
  strokeWidth: properties.outterStrokeWidth,
  radius: WIDTH / 2 - margin,
};

export function drawOutterCircle() {
  drawCircle(outterCircle);
}
