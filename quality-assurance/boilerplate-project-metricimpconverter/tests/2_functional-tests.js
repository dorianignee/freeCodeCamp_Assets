const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Convert a valid unit.', done => {
    chai
      .request(server)
      .get('/api/convert?input=10L')
      .end((err, res) => {
        assert.isNotOk(err);
        assert.equal(res.status, 200);
        assert.oneOf(res.type, ["text/json", "application/json"])
        assert.hasAllKeys(res.body, [
          "initNum",
          "initUnit",
          "returnNum",
          "returnUnit",
          "string"
        ]);
        assert.approximately(res.body.returnNum, 2.64, 0.01);

        done();
      })
  });

  test('Convert an invalid unit.', done => {
    chai
      .request(server)
      .get('/api/convert?input=32g')
      .end((err, res) => {
        // assert.notEqual(res.status, 200); // fcc tests are not passing with status 400
        assert.equal(res.text, "invalid unit");

        done();
      });
  });

  test('Convert an invalid number.', done => {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end((err, res) => {
        // assert.notEqual(res.status, 200); // fcc tests are not passing with status 400
        assert.equal(res.text, "invalid number");

        done();
      });
  });

  test('Convert an invalid number and unit.', done => {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end((err, res) => {
        // assert.notEqual(res.status, 200); // fcc tests are not passing with status 400
        assert.equal(res.text, "invalid number and unit");

        done();
      });
  });

  test('Convert with no number.', done => {
    chai
      .request(server)
      .get('/api/convert?input=kg')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.oneOf(res.type, ["text/json", "application/json"]);
        assert.hasAllKeys(res.body, [
          "initNum",
          "initUnit",
          "returnNum",
          "returnUnit",
          "string"
        ]);
        assert.approximately(res.body.returnNum, 2.2, 0.01);

        done();
      });
  });
});
