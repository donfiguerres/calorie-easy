import { render, screen } from '@testing-library/react';
import * as FitnessEasy from './FitnessEasy';

test('validate number', () => {
    expect(FitnessEasy.validateNumericalInput("123")).toEqual("123")
    expect(FitnessEasy.validateNumericalInput("1.1")).toEqual("1.1")
    expect(FitnessEasy.validateNumericalInput("1.")).toEqual("1.")
    expect(FitnessEasy.validateNumericalInput("1..")).toEqual("")
});

test('trim end dot', () => {
    expect(FitnessEasy.trimEndDot("123")).toEqual("123")
    expect(FitnessEasy.trimEndDot("1.")).toEqual("1")
    expect(FitnessEasy.trimEndDot("1.1")).toEqual("1.1")
});

test('renders BMI interface', () => {
    render(<FitnessEasy.default />);
    const element = screen.getByText(/BMI/);
    expect(element).toBeInTheDocument();
})