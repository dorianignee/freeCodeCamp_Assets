import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CalculatorState = {
  power: boolean,
  display: string,
  value: number,
  subtotals: number[],
  operator: string,
  negativeInput: boolean,
  error: boolean,
  decimal: boolean,
  newNumber: boolean,
};

const initialState: CalculatorState = 
{
  power: true,          // Is the calculator switched on?
  display: "0.",        // current display text
  value: 0,             // numeric value of display text
  subtotals: [0, 0],    // subtotals for each operator precedence
  operator: "+",        // currently active operator for infix operation
  negativeInput: false, // is current input a negative number?
  error: false,         // is calculator displaying "Error"?
  decimal: false,       // was the decimal button pressed for the current number?
  newNumber: true,      // should the next keypress start a new number?
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
              state.value = 0.0;
              state.display = "0."
              state.negativeInput = false;
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
            infixOperation(state, "+");
            break;

          case "zero":
            if (state.value !== 0 || state.decimal)
              inputNumber(state, 0);
            break;

          case "one":
            inputNumber(state, 1);
            break;

          case "two":
            inputNumber(state, 2);
            break;
            
          case "three":
            inputNumber(state, 3);
            break;
            
          case "four":
            inputNumber(state, 4);
            break;
            
          case "five":
            inputNumber(state, 5);
            break;
            
          case "six":
            inputNumber(state, 6);
            break;
            
          case "seven":
            inputNumber(state, 7);
            break;
            
          case "eight":
            inputNumber(state, 8);
            break;
            
          case "nine":
            inputNumber(state, 9);
            break;

          default:
            // do nothing
        }
      }
    },
  },
});

const infixOperationy = (state: CalculatorState, nextOperator: string) => {
  // on subsequent presses of operators
  if (state.newNumber) {
    state.operator = nextOperator;
    return;
  }

  // calculate the previous infix operation
  switch(state.operator) {
    // for addition and subtraction, the values are stored as 
    // possible factors or quotients for following multiplications or divisions
    case "+":
      if (operatorPrecedence(nextOperator) === 1) {
        state.subtotals[0] += state.subtotals[1];
        state.subtotals[1] = state.value;  
      } else {
        state.subtotals[0] += state.subtotals[1] + state.value;
        state.value = state.subtotals[0];
      }
      break;

    case "-":
      state.subtotals[0] -= state.subtotals[1];
      state.subtotals[1] = state.value;
      state.value = state.subtotals[0];
      break;

    case "*":
      state.subtotals[1] *= state.value;
      state.value = state.subtotals[1];
      break;

    case "/":
      if (state.value === 0) { // show division by zero error
        showError(state);
        return;
      }
      state.subtotals[1] /= state.value;
      state.value = state.subtotals[1];
      break;
    
    default: // unknown operator; shouldn't happen
      showError(state);
      return;
  }

  // prepare next operation
  state.operator = nextOperator;
  state.newNumber = true;
  state.decimal = false;
  state.negativeInput = false;
  state.display = getDisplayText(state.value);
  console.log(state);
}

const infixOperation = (state: CalculatorState, nextOperator: string) => {
  if ("*/".includes(state.operator)) {
    if (state.operator === "*") {
      state.subtotals[1] *= state.value;
    } else { // divide
      if (state.value === 0) { // division by 0 error
        showError(state);
        return;
      }
      state.subtotals[1] /= state.value;
    }

    // if next operation is multiplication or division, show only subtotal of that operation
    if ("*/".includes(nextOperator)) {
      state.value = state.subtotals[1];
    } else {
      state.value = state.subtotals[1] + state.subtotals[0];
      state.subtotals[0] = state.value;
    }
  } else {
    if ("*/".includes(nextOperator)) {
      state.subtotals[1] = state.value;
    } else {
      switch (state.operator) {
        case "+":
          state.subtotals[0] += state.value;
          break;

        case "-":
          state.subtotals[0] -= state.value;
          break;

        case "=":
          state.subtotals[0] = state.value;
          break;

        default: 
          showError(state); // shouldn't happen
          break;
      }
      state.value = state.subtotals[0];
    }
  }
  state.operator = nextOperator;
  state.newNumber = true;
  state.decimal = false;
  state.negativeInput = false;
  state.display = getDisplayText(state.value);
  console.log(state);
}

const operatorPrecedence = (operator: string) =>
  "*/".includes(operator)? 1: 0;

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
  if (!tempResult.includes("."))
    tempResult += ".";

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

const inputNumber = (state: CalculatorState, number: number) => {
  if (state.newNumber) {
    state.value = state.negativeInput? -number: number;
    state.display = state.value.toString() + ".";
  } else {
    // In decimal mode, we append numbers to the display text and parse them to get the value
    if (state.decimal) {
      let maxLength = state.negativeInput? 10: 9;
      if (state.display.length < maxLength) {
        state.display += number.toString();
        state.value = parseFloat(state.display);
      }
    } else { // In non-decimal mode, we append numbers to the value and calculate the resulting display text
      if (state.value < 10000000 && state.value > -10000000) {
        state.value = state.value * 10 + (state.negativeInput? -number: number);
        state.display = state.value.toString() + ".";
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