import { render, screen } from '@testing-library/react';
import * as Formula from './Formula';

test('calculate bmi', () => {
    expect(Formula.bmi(70, 1.6)).toEqual(27.34);
});