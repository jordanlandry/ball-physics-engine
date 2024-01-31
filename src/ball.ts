import { CENTER_X, CENTER_Y, drawCircle } from "./canvas";
import { getCollision } from "./helpers/getCollision";
import { convertToString, getNewColor } from "./helpers/getNewColor";
import { getRandomNumber } from "./helpers/getRandomNumber";
import { outterCircle } from "./outterCircle";
import { properties } from "./properties";
import { Position, RGB } from "./types";

export class Ball {
  private frame = 0;
  private gradientIndex = getRandomNumber(0, properties.gradient.length - 1, true);

  private lastPosition: Position = { x: 0, y: 0 };

  private trace: {
    position: Position;
    radius: number;
    rgb: RGB;
    stroke: string;
  }[] = [];

  position: Position;
  velocity: Position;
  radius: number;
  rgb: RGB;
  stroke: string = properties.strokeColor;
  colliding: boolean = false;

  constructor(x: number, y: number, radius: number) {
    this.position = { x, y };

    this.radius = radius;

    const rgb = properties.gradient[0];
    this.rgb = rgb;

    const initialX = getRandomNumber(-2, 2);
    const initialY = getRandomNumber(1, 2);

    this.velocity = { x: initialX, y: -initialY };
  }

  draw() {
    const drawable = [...this.trace, this];

    for (const ball of drawable) {
      const fill = convertToString(ball.rgb);

      drawCircle({
        position: ball.position,
        stroke: ball.stroke,
        strokeWidth: 1,
        radius: ball.radius,
        fill,
      });
    }
  }

  updateBoundries() {


    let count = 0;
    while(getCollision(this)) {
      count++;
      // Push it closer to the center
      const offsetX = this.position.x > CENTER_X ? -1 : 1;
      const offsetY = this.position.y > CENTER_Y ? -1 : 1;

      this.position.x += offsetX;
      this.position.y += offsetY;

      if (count > 25) {
        this.position.x = CENTER_X;
        this.position.y = CENTER_Y;

        this.velocity.x = 0;
        this.velocity.y = 0; 
        break;
      }

       if (this.radius >= outterCircle.radius) break;
    }
  }

  updateColor() {
    if (this.frame % properties.updateGradientFrequency) return;

    const { r, g, b, next } = getNewColor(this.rgb, this.gradientIndex);
    this.rgb = { r, g, b };

    this.gradientIndex = next;
  }

  updateTrace() {
    if (this.frame % properties.traceFrequency !== 0) return;

    this.trace.push({
      position: { x: this.position.x, y: this.position.y },
      radius: this.radius,
      rgb: { ...this.rgb },
      stroke: this.stroke,
    });

    if (this.trace.length > properties.traceLength) this.trace.shift();
  }

  updatePositionByCollision() {
    if (!getCollision(this)) return;

    this.colliding = true;

    // We need to move the ball out of the collision
    this.position.x -= this.velocity.x;
    this.position.y -= this.velocity.y;

    // Calculate the angle of the collision
    const relativeX = this.position.x - outterCircle.position.x;
    const relativeY = this.position.y - outterCircle.position.y;

    // Calculate the new velocity of the ball
    const velocityMagnitude = Math.sqrt(
      this.velocity.x ** 2 + this.velocity.y ** 2
    );

    const velocityAngle = Math.atan2(this.velocity.y, this.velocity.x);
    const collisionNormal = Math.atan2(relativeY, relativeX);

    // Reflect the velocity vector off the collision normal
    const reflectionAngle = 2 * collisionNormal - velocityAngle;

    // Calculate the new velocity components
    const newVelocityX = Math.cos(reflectionAngle) * -velocityMagnitude;
    const newVelocityY = Math.sin(reflectionAngle) * -velocityMagnitude;

    this.velocity.x = newVelocityX;
    this.velocity.y = newVelocityY;

    const radiusIncrease = Math.min(
      this.radius * properties.increaseRadius,
      properties.maxIncrease
    );
    
    this.radius += radiusIncrease;

    
    // Move the ball out of the collision
    // while (getCollision(this)) {
      
      
      // this.position.x += this.velocity.x + offsetX;
      // this.position.y += this.velocity.y + offsetY;
      // }
      
      // while (getCollision(this)) {
        //   const offsetX = this.position.x > 0 ? -radiusIncrease : radiusIncrease;
        //   const offsetY = this.position.y > 0 ? -radiusIncrease : radiusIncrease;
        
        // this.position.x += offsetX;
        // this.position.y += offsetY;
        
        // console.log(this.position, offsetX, offsetY);
        // }
        
    const offsetX = this.position.x > 0 ? -radiusIncrease : radiusIncrease;
    const offsetY = this.position.y > 0 ? -radiusIncrease : radiusIncrease;

    this.position.x = this.lastPosition.x + offsetX;
    this.position.y = this.lastPosition.y + offsetY;

    // Apply a minimum velocity threshold to prevent getting stuck
    const minVelocity = 0.1; // Adjust this threshold as needed
    if (Math.abs(this.velocity.x) < minVelocity) this.velocity.x = 0;
    if (Math.abs(this.velocity.y) < minVelocity) this.velocity.y = 0;

    // this.updatePositionByCollision(count + 1);
  }

  updateVelocity() {
    this.velocity.y += properties.gravity;
  }

  updatePosition() {
    this.lastPosition.x = this.position.x;
    this.lastPosition.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  updateSizeBoundries() {
    if (this.radius > outterCircle.radius) this.radius = outterCircle.radius;
  }

  update() {
    this.frame++;

    this.updateColor();
    this.updateTrace();

    this.updateVelocity();
    this.updatePosition();

    this.updatePositionByCollision();
    this.updateBoundries();
    this.updateSizeBoundries();
  }
}
