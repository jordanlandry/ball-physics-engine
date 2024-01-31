export const properties = {
  gravity: 0.04,

  traceFrequency: 10,
  traceLength: 10,

  randomMin: -0.3,
  randomMax: 0.3,
  randomFactor: 100,

  gradient: [
    { r: 255, g: 0, b: 0 },
    { r: 255, g: 255, b: 0 },
    { r: 0, g: 255, b: 0 },
    { r: 0, g: 255, b: 255 },
    { r: 0, g: 0, b: 255 },
    { r: 255, g: 0, b: 255 },
  ],

  gradientFrequency: 100,
  updateGradientFrequency: 1,

  strokeColor: '#000000',

  outterStrokeColor: '#ff0000',
  outterStrokeWidth: 5,
  outterFillColor: 'white',


  increaseRadius: 0.05,  // Percentage
  maxIncrease: Infinity, // Pixels

  playAudio: false,
};
