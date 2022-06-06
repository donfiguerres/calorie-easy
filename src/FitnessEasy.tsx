import React from 'react';
import * as Formula from './Formula';

/**
 * Sanitize numerical input. It should be a positive number and can have decimal
 * values. It allows one trailing decimal point for incomplete input.
 * @param input input string
 * @returns sanitized string
 */
const validateNumericalInput = (input: string) : string => {
  let pattern = /^[0-9]*\.?[0-9]*$/;
  let matches = input.match(pattern);
  if (matches)
    return matches[0];
  return "";
};

/**
 * Trim dot at the end of the string if a dot exists.
 * @param input input string
 * @returns trimmed string
 */
const trimEndDot = (input: string) : string => {
  if (input[input.length - 1] === ".")
    return input.slice(0, -1);
  return input;
}

type FitnessEasyState = {
  height: number,
  heightDisplayed: string,
  weight: number,
  weightDisplayed: string,
  bmi: number
};

class FitnessEasy extends React.Component<{}, FitnessEasyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      height: 0,
      heightDisplayed: "0",
      weight: 0,
      weightDisplayed: "0",
      bmi: 0
    };
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
  }

  handleHeightChange(e: React.ChangeEvent<HTMLInputElement>) : void {
    let newHeightDisplayed = validateNumericalInput(e.target.value);
    let newHeight = Number(trimEndDot(newHeightDisplayed))
    this.setState((prevState) => {
      return {
        heightDisplayed: newHeightDisplayed,
        height: newHeight,
        bmi: Formula.bmi(prevState.weight, newHeight)
      }
    });
  }

  handleWeightChange(e: React.ChangeEvent<HTMLInputElement>) : void {
    let newWeightDisplayed = validateNumericalInput(e.target.value);
    let newWeight = Number(trimEndDot(newWeightDisplayed))
    this.setState((prevState) => {
      return {
        weightDisplayed: newWeightDisplayed,
        weight: newWeight,
        bmi: Formula.bmi(newWeight, prevState.height)
      }
    });
  }

  render() {
    return (
      <div>
        <h3>Weight</h3>
        <input value={this.state.weightDisplayed} onChange={this.handleWeightChange}></input>
        <h3>Height</h3>
        <input value={this.state.heightDisplayed} onChange={this.handleHeightChange}></input>
        <h3>BMI</h3>
        <input value={this.state.bmi} readOnly></input>
      </div>
    )
  }
}

export default FitnessEasy;
export {
  validateNumericalInput,
  trimEndDot
}