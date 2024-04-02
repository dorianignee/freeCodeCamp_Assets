const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Input numbers', () => {
    test('convertHandler should correctly read a whole number input.', () => {
      assert.equal(convertHandler.getNum("5km"), 5);
      assert.equal(convertHandler.getNum("3mi"), 3);
    });
    test('convertHandler should correctly read a decimal number input.', () => {
      assert.equal(convertHandler.getNum("4.83km"), 4.83);
      assert.equal(convertHandler.getNum("3.107mi"), 3.107);
    });
    test('convertHandler should correctly read a fractional input.', () => {
      assert.equal(convertHandler.getNum("3/5km"), 3/5);
      assert.equal(convertHandler.getNum("1/4mi"), 1/4);
    });
    test('convertHandler should correctly read a fractional input with a decimal.', () => {
      assert.equal(convertHandler.getNum("1.5/2lbs"), 0.75);
    });
    test('convertHandler should correctly return an error on a double-fraction.', () => {
      assert.throws(() => convertHandler.getNum("3/2/3km"));
    });
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
      assert.equal(convertHandler.getNum("L"), 1);
      assert.equal(convertHandler.getNum("mi"), 1);
    });
  });
  
  suite('Conversion units', () => {
    test('convertHandler should correctly read each valid input unit.', () => {
      assert.equal(convertHandler.getUnit("10gal"), "gal");
      assert.equal(convertHandler.getUnit("10l"), "L");
      assert.equal(convertHandler.getUnit("10Mi"), "mi");
      assert.equal(convertHandler.getUnit("10kM"), "km");
      assert.equal(convertHandler.getUnit("10LBS"), "lbs");
      assert.equal(convertHandler.getUnit("10kg"), "kg");
    });
    test('convertHandler should correctly return an error for an invalid input unit.', () => {
      assert.throws(() => convertHandler.getUnit("10gallongs"));
      assert.throws(() => convertHandler.getUnit("10g"));
    });
    test('convertHandler should return the correct return unit for each valid input unit.', () => {
      assert.equal(convertHandler.getReturnUnit("gal"), "L");
      assert.equal(convertHandler.getReturnUnit("L"), "gal");
      assert.equal(convertHandler.getReturnUnit("mi"), "km");
      assert.equal(convertHandler.getReturnUnit("km"), "mi");
      assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
      assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
    });
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => {
      assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
      assert.equal(convertHandler.spellOutUnit("L"), "liters");
      assert.equal(convertHandler.spellOutUnit("mi"), "miles");
      assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
      assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
      assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
    });
  });
  
  suite('Conversions', () => {
    test('convertHandler should correctly convert gal to L.', () => {
      assert.approximately(convertHandler.convert(5, "gal"), 18.93, 0.01);
    });
    test('convertHandler should correctly convert L to gal.', () => {
      assert.approximately(convertHandler.convert(5, "L"), 1.32, 0.01);
    });
    test('convertHandler should correctly convert mi to km.', () => {
      assert.approximately(convertHandler.convert(5, "mi"), 8.05, 0.01);
    });
    test('convertHandler should correctly convert km to mi.', () => {
      assert.approximately(convertHandler.convert(5, "km"), 3.11, 0.01);
    });
    test('convertHandler should correctly convert lbs to kg.', () => {
      assert.approximately(convertHandler.convert(5, "lbs"), 2.27, 0.01);
    });
    test('convertHandler should correctly convert kg to lbs.', () => {
      assert.approximately(convertHandler.convert(5, "kg"), 11.02, 0.01);
    });
  });
});