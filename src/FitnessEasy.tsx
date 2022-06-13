import React from 'react';
import * as Formula from './Formula';
import {Form, InputGroup, FormControl} from 'react-bootstrap';
import './FitnessEasy.scss';

/**
 * Sanitize numerical input. It should be a positive number and can have decimal
 * values. It allows one trailing decimal point for incomplete input.
 * @param input input string
 * @returns sanitized string
 */
export const validateNumericalInput = (input: string) : string => {
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
export const trimEndDot = (input: string) : string => {
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
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">Weight</InputGroup.Text>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={this.state.weightDisplayed} onChange={this.handleWeightChange}
          />
        </InputGroup>
        <br />
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">Height</InputGroup.Text>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={this.state.heightDisplayed} onChange={this.handleHeightChange}
          />
        </InputGroup>
        <br />
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">BMI</InputGroup.Text>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={this.state.bmi} readOnly
          />
        </InputGroup>
      </div>
    )
  }
}

export default FitnessEasy;