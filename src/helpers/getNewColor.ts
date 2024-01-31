import { properties } from "../properties";
import { RGB } from "../types";

export function getNewColor(current: RGB, i: number) {
  const { gradient } = properties;
  const nextIndex = i === gradient.length - 1 ? 0 : i + 1;

  const next = gradient[nextIndex];

  const rDiff = next.r - current.r;
  const gDiff = next.g - current.g;
  const bDiff = next.b - current.b;

  const rStep = Math.ceil(rDiff / properties.gradientFrequency);
  const gStep = Math.ceil(gDiff / properties.gradientFrequency);
  const bStep = Math.ceil(bDiff / properties.gradientFrequency);

  const onNextIndex = rStep === 0 && gStep === 0 && bStep === 0;

  return {
    r: current.r + rStep,
    g: current.g + gStep,
    b: current.b + bStep,
    next: onNextIndex ? nextIndex : i,
  };
}

export function convertToString({ r, g, b }: RGB) {
  return `rgb(${r}, ${g}, ${b})`;
}
