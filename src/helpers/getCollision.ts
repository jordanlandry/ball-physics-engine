import { Ball } from "../ball";
import { outterCircle } from "../outterCircle";
import { getDistance } from "./getDistance";

/*
 If the distance from the center of the ball to the center of the 
 outter circle + the radius of the ball is greater than the radius of 
 the outter circle, then there is collision
*/

export function getCollision(ball: Ball) {
  const distance = getDistance(ball.position, outterCircle.position);
  return distance + ball.radius > outterCircle.radius;
}
