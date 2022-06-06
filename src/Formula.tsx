
export function roundDecimal(num: number, precision: number) : number {
  return parseFloat(num.toFixed(precision));
}

export function bmi(weight: number, height: number, precision: number = 2) {
  return roundDecimal(weight / Math.pow(height, 2), precision);
}
