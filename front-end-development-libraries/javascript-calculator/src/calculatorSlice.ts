import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CalculatorState = {
  power: boolean,
  display: string,
  value: number,
  operator: string,
  negativeInput: boolean,
  error: boolean,
  decimal: boolean,
  newNumber: boolean,
  formula: string,
};

const initialState: CalculatorState = 
{
  power: true,          // Is the calculator switched on?
  display: "0",         // current display text
  value: 0,             // numeric value of display text
  operator: "=",        // current infix operator
  negativeInput: false, // is current input a negative number?
  error: false,         // is calculator displaying "Error"?
  decimal: false,       // was the decimal button pressed for the current number?
  newNumber: true,      // should the next keypress start a new number?
  formula: "0",
}

export const calculatorSlice = createSlice({
  name: 'calc',
  initialState: initialState,
  reducers: {
    buttonPress: (state: CalculatorState, action: PayloadAction<string>) => {
      // Handle On and Off seperately because they don't depend on state
      switch (action.payload) {
        case "clear":
          Object.assign(state, initialState);
          break;

        case "off":
          state.power = false;
          state.display = "!"; // 7-segment all blank character
          break;

        default:
          // do nothing
      }

      if (state.power && !state.error) {
        switch (action.payload) {
          case "clearEntry":
            if (state.value === 0) {
              Object.assign(state, initialState);
            } else {
              state.value = 0;
              state.display = "0"
              state.negativeInput = false;
              state.decimal = false
            }
            break;
          
          case "del":
            if (/^-?\d\.?$/.test(state.display)) { // if only one digit on screen
                Object.assign(state, initialState);
            } else {
              state.display = state.display.substring(0, state.display.length - 1);
              state.value = parseFloat(state.display);
            }
            break;

          case "decimal":
            state.decimal = true;
            if (state.newNumber) {
              state.value = 0;
              state.display = state.negativeInput ? "-0.":"0."
              state.newNumber = false;
            }
            break;

          case "add":
            infixOperation(state, "+");
            break;

          case "subtract":
            if (state.newNumber) {
              state.display = "-0."
              state.negativeInput = true;
            } else {
              infixOperation(state, "-");
            }
            break;

          case "multiply":
            infixOperation(state, "*");
            break;

          case "divide":
            infixOperation(state, "/");
            break;

          case "equals":
            infixOperation(state, "=");
            break;

          case "zero":
            if (state.value !== 0 || state.decimal)
              inputDigit(state, 0);
            break;

          case "one":
            inputDigit(state, 1);
            break;

          case "two":
            inputDigit(state, 2);
            break;
            
          case "three":
            inputDigit(state, 3);
            break;
            
          case "four":
            inputDigit(state, 4);
            break;
            
          case "five":
            inputDigit(state, 5);
            break;
            
          case "six":
            inputDigit(state, 6);
            break;
            
          case "seven":
            inputDigit(state, 7);
            break;
            
          case "eight":
            inputDigit(state, 8);
            break;
            
          case "nine":
            inputDigit(state, 9);
            break;

          default:
            // do nothing. Is called by On and Off keys
        }
      };

      console.log(state.formula);
    },
  },
});

// calculations are done using Javascripts eval function 
const infixOperation = (state: CalculatorState, nextOperator: string) => {
  // consecutive presses of operators just change the operation but don't calculate anything
  if (state.newNumber && state.operator !== "=") {
    state.operator = nextOperator;
    state.negativeInput = false;
    return;
  }

  if (state.operator === "=") {
    state.formula = "(" + state.value + ")";   
  } else {
    state.formula += state.operator + "(" + state.value + ")";
  }
  
  state.value = eval(state.formula);
  state.operator = nextOperator;
  prepareNewNumber(state);
  state.display = getDisplayText(state.value);
}

const prepareNewNumber = (state: CalculatorState) => {
  state.negativeInput = false;
  state.decimal = false;
  state.newNumber = true;
}

const getDisplayText = (number: number) => {
  let tempResult = number.toString();
  let tempLength = tempResult.length;
  
  // if number is longer than 8 digits, truncate to display size
  if (tempResult.startsWith("-"))
    tempLength--;
  if (tempResult.includes("."))
    tempLength--;
  if (tempLength >= 8) {
    tempResult = number.toPrecision(8);
  }

  // append a dot for calculator style
  // if (!tempResult.includes("."))
  //   tempResult += ".";

  // if scientific notation is neccessary, truncate to 8 digits
  if (tempResult.includes("e")) {
    let [ mantissa, exponent ] = tempResult.split("e");
    let negativeOffset = number < 0? 1: 0;
    if (exponent.startsWith("+"))
      tempResult = mantissa.substring(0, 9 - exponent.length + negativeOffset) + "E" + exponent.substring(1);
    else
      tempResult = mantissa.substring(0, 8 - exponent.length + negativeOffset) + "E" + exponent;
  }
  
  return tempResult;
}

const inputDigit = (state: CalculatorState, digit: number) => {
  if (state.newNumber) {
    state.value = state.negativeInput? -digit: digit;
    state.display = getDisplayText(state.value);
  } else {
    // In decimal mode, we append numbers to the display text and parse them to get the value
    if (state.decimal) {
      let maxLength = state.negativeInput? 10: 9;
      if (!state.display.includes("."))
        state.display += ".";
      if (state.display.length < maxLength) {
        state.display += digit.toString();
        state.value = parseFloat(state.display);
      }
    } else { // In non-decimal mode, we append numbers to the value and calculate the resulting display text
      if (state.value < 10000000 && state.value > -10000000) {
        state.value = state.value * 10 + (state.negativeInput? -digit: digit);
        state.display = getDisplayText(state.value);
      }
    }
  }
  state.newNumber = false;
}

const showError = (state: CalculatorState) => {
  state.error = true;
  state.display = "Error!";
}

export const { buttonPress } = calculatorSlice.actions

export default calculatorSlice.reducer;