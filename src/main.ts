import { AudioManager } from "./audioManager";
import { firefly } from "./audioTracks/firefly";
import { turkishMarch } from "./audioTracks/turkishMarch";
import { Ball } from "./ball";
import {
  CENTER_X,
  CENTER_Y,
  clearCanvas,
  createCanvas,
  drawText,
} from "./canvas";
import { drawOutterCircle, outterCircle } from "./outterCircle";
import { properties } from "./properties";
import "./style.css";

createCanvas();

const audioTrack = firefly;

const audioManager = new AudioManager(audioTrack);

const ballCount = 1;
const ballRadius = 100;
const balls = Array.from(
  { length: ballCount },
  () => new Ball(CENTER_X, CENTER_Y, ballRadius)
);

drawOutterCircle();

let lastTime = 0;
const getFps = () => {
  const now = performance.now();

  const delta = now - lastTime;
  lastTime = now;

  return Math.round(1000 / delta);
}

let deleteCount = 0;
function draw() {
  if (!lastTime) lastTime = performance.now();
  const fps = getFps();
  
  clearCanvas();
  drawOutterCircle();
  
  // Add text to show the number of balls
  drawText(`Balls: ${balls.length - deleteCount}`, { x: 10, y: 30 });
  drawText(`FPS: ${fps}`, { x: 10, y: 60 });

  const percentToSpawnNew = 0;
  for (const ball of balls) {
    if (ball.radius >= outterCircle.radius) {
      deleteCount++;
      continue;
    } 

    ball.update();
    ball.draw();

    if (ball.colliding) {
      if (properties.playAudio) audioManager.play();

      if (Math.random() < percentToSpawnNew) {
        const newBall = new Ball(CENTER_X, CENTER_Y, ballRadius);
        balls.push(newBall);
      }

      ball.colliding = false;
    }
  }

  requestAnimationFrame(draw);
}

// draw();

window.addEventListener("keydown", (e) => {
  if (e.key === " ") draw();
  if (e.key === "Enter") audioManager.testSong();
});
