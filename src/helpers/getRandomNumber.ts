export function getRandomNumber(min: number, max: number, isInteger?: boolean) {
  if (isInteger) {
    return Math.round(Math.random() * (max - min) + min);
  }
  
  return Math.random() * (max - min) + min;
}
