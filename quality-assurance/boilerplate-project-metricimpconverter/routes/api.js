'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    if (!req.query.input) return res.status(400).send("Missing required field 'input'");

    // try to read number and unit
    let initNum;
    let initUnit;
    try {
      initNum = convertHandler.getNum(req.query.input)
    } catch (e) {
      initNum = NaN;
    }

    try {
      initUnit = convertHandler.getUnit(req.query.input)
    } catch (e) {
      if (isNaN(initNum)) return res.status(400).send("Invalid number and unit");
      else return res.status(400).send("Invalid unit");
    }

    if (isNaN(initNum)) return res.status(400).send("Invalid number");

    // convert and send result
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  })

};
