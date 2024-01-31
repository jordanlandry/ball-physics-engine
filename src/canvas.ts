import { Position } from "./types";

const aspectRatio = 9 / 16;

export const HEIGHT = 800;
export const WIDTH = HEIGHT * aspectRatio;

export const CENTER_X = WIDTH / 2;
export const CENTER_Y = HEIGHT / 2;

const backgroundColor = "#000000";
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

export function createCanvas() {
  canvas.height = HEIGHT;
  canvas.width = WIDTH;
  canvas.style.backgroundColor = backgroundColor;

  document.body.appendChild(canvas);
}

export function drawText(text: string, position: Position) {
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(text, position.x, position.y);
}

export function drawCircle(props: {
  position: Position;
  fill: string;
  stroke: string;
  strokeWidth: number;
  radius: number;
}) {
  const { position, fill, stroke, strokeWidth, radius } = props;

  ctx.beginPath();
  ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = fill;
  ctx.fill();

  ctx.lineWidth = strokeWidth;
  ctx.strokeStyle = stroke;
  ctx.stroke();
}

export function clearCanvas() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
