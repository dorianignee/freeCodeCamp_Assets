function ConvertHandler() {
  
  this.getNum = function(input) {
    let numString = /^[\d\.\/]*/.exec(input)[0];
    if (numString === '') return 1; // if no number is provided, the function should convert 1 unit

    let {numerator, denominator} = /^(?<numerator>\d+(\.\d+)?)(\/(?<denominator>\d+(\.\d+)?))?$/.exec(numString).groups;
    return denominator === undefined ? numerator: numerator / denominator;
  };
  
  this.getUnit = function(input) {
    let result = /^[\d\.\/]*(gal|l|mi|km|lbs|kg)$/.exec(input.toLowerCase())[1];
    
    return result === 'l'?'L':result;
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitTranslation = {
      "gal": "L",
      "L": "gal",
      "mi": "km",
      "km": "mi",
      "lbs": "kg",
      "kg": "lbs"
    }

    return unitTranslation[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spellOut = {
      "gal": "gallons",
      "L": "liters",
      "mi": "miles",
      "km": "kilometers",
      "lbs": "pounds",
      "kg": "kilograms"
    }

    return spellOut[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const calculation = {
      "gal": {
        factor: galToL,
        multiply: true
      },
      "L": {
        factor: galToL,
        multiply: false
      },
      "lbs": {
        factor: lbsToKg,
        multiply: true
      },
      "kg": {
        factor: lbsToKg,
        multiply: false
      },
      "mi": {
        factor: miToKm,
        multiply: true
      },
      "km": {
        factor: miToKm,
        multiply: false
      },
    }

    const convert = calculation[initUnit];

    const result = convert.multiply
        ? initNum * convert.factor
        : initNum / convert.factor;
    
    return round5(result);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

const round5 = number => Math.round(number*100000)/100000

module.exports = ConvertHandler;
