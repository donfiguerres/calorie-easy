import * as Formula from './Formula';

test('round decimal', () => {
  expect(Formula.roundDecimal(31.154, 2)).toEqual(31.15);
});

test('calculate bmi', () => {
  expect(Formula.bmi(70, 1.6)).toEqual(27.34);
});