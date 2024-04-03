const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

const issueIDs = [];

chai.use(chaiHttp);

suite('Functional Tests', function() {
  // Delete project and issues from previous tests
  this.beforeAll(() => {
    const mongoose = require('mongoose');
    const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
    mongoose.connect(process.env.MONGO_URI, clientOptions);

    mongoose
      .model('Project')
      .deleteOne({name: 'functionalTests'})
      .then(project => {
        mongoose
          .model('Issue')
          .deleteMany({project: project._id})
          .catch(err => console.log("Could not delete test issues: " + err.msg));
      })
      .catch(err => console.log("Could not delete test project: " + err.msg));
  });

  suite('Creating Issues', () => {
    test('Create an issue with every field', done => {
      chai
        .request(server)
        .post('/api/issues/functionalTests')
        .type('form')
        .send({
          'issue_title': 'Functional Test 1',
          'issue_text': 'Create an issue with every field',
          'created_by': 'chai test suite',
          'assigned_to': 'project api',
          'status_text': 'in test'
        })
        .end((err, res) => {
          assert.notOk(err);
          assert.equal(res.status, 200);
          assert.hasAllKeys(res.body, [
            '_id',
            'issue_title',
            'issue_text',
            'created_by',
            'created_on',
            'updated_on',
            'assigned_to',
            'open',
            'status_text'
          ]);
          assert.includeMembers(res.body, {
            'issue_title': 'Functional Test 1',
            'issue_text': 'Create an issue with every field',
            'created_by': 'chai test suite',
            'assigned_to': 'project api',
            'status_text': 'in test',
            'open': true
          });
          done();
        });
    });

    test('Create an issue with only required fields', done => {
      chai
        .request(server)
        .post('/api/issues/functionalTests')
        .type('form')
        .send({
          'issue_title': 'Functional Test 2',
          'issue_text': 'Create an issue with only required fields',
          'created_by': 'chai test suite'
        })
        .end((err, res) => {
          assert.notOk(err);
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.hasAllKeys(res.body, [
            '_id',
            'issue_title',
            'issue_text',
            'created_by',
            'created_on',
            'updated_on',
            'assigned_to',
            'open',
            'status_text'
          ]);
          assert.includeMembers(res.body, {
            'issue_title': 'Functional Test 2',
            'issue_text': 'Create an issue with only required fields',
            'created_by': '',
            'assigned_to': '',
            'status_text': '',
            'open': true
          });
          done();
        });
    });

    test('Create an issue with missing required fields', done => {
      chai
        .request(server)
        .post('/api/issues/functionalTests')
        .type('form')
        .send({
          'issue_title': 'Functional Test 3',
          'issue_text': 'Create an issue with missing required fields'
        })
        .end((err, res) => {
          assert.notOk(err);
          //assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.deepEqual(res.body, {'error': 'required field(s) missing' });
          done();
        });
    });
  });

  suite('Querying Issues', () => {
    test('View issues on a project', done => {
      chai
        .request(server)
        .get('/api/issues/functionalTests')
        .end((err, res) => {
          assert.notOk(err);
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.isArray(res.body);
          assert.equal(res.body.length, 2);
          assert.hasAllKeys(res.body[0], [
            '_id',
            'issue_title',
            'issue_text',
            'created_by',
            'created_on',
            'updated_on',
            'assigned_to',
            'open',
            'status_text'
          ]);
          assert.includeMembers(res.body[0], {
            'issue_title': 'Functional Test 1',
            'issue_text': 'Create an issue with every field',
            'created_by': 'chai test suite',
            'assigned_to': 'project api',
            'status_text': 'in test',
            'open': true
          });

          // remember issue IDs for PUT and DELETE tests
          issueIDs = res.body.map(issue => issue._id);
          done();
        });
    });

    test('View issues on a project with one filter', done => {
      chai
        .request(server)
        .get('/api/issues/functionalTests')
        .query({'issue_title': 'Functional Test 1'})
        .end((err, res) => {
          assert.notOk(err);
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.isArray(res.body);
          assert.equal(res.body.length, 1);
          assert.hasAllKeys(res.body[0], [
            '_id',
            'issue_title',
            'issue_text',
            'created_by',
            'created_on',
            'updated_on',
            'assigned_to',
            'open',
            'status_text'
          ]);
          assert.includeMembers(res.body[0], {
            'issue_title': 'Functional Test 1',
            'issue_text': 'Create an issue with every field',
            'created_by': 'chai test suite',
            'assigned_to': 'project api',
            'status_text': 'in test',
            'open': true
          });
          done();
        });
    });

    test('View issues on a project with multiple filters', done => {
      chai
        .request(server)
        .get('/api/issues/functionalTests')
        .query({
          'issue_title': 'Functional Test 1',
          'open': true,
          'assigned_to': 'project api'
        })
        .end((err, res) => {
          assert.notOk(err);
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.isArray(res.body);
          assert.equal(res.body.length, 1);
          assert.hasAllKeys(res.body[0], [
            '_id',
            'issue_title',
            'issue_text',
            'created_by',
            'created_on',
            'updated_on',
            'assigned_to',
            'open',
            'status_text'
          ]);
          assert.includeMembers(res.body[0], {
            'issue_title': 'Functional Test 1',
            'issue_text': 'Create an issue with every field',
            'created_by': 'chai test suite',
            'assigned_to': 'project api',
            'status_text': 'in test',
            'open': true
          });
          done();
        });
    });
  });

  suite('Updating issues', () => {
    test('Update one field on an issue', done => {
      chai
        .request(server)
        .put('/api/issues/functionalTests')
        .type('form')
        .send({
          '_id': issueIDs[0],
          'status_text': 'updated'
        })
        .end((err, res) => {
          assert.notOk(err);
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.deepEqual(res.body, {'result': 'successfully updated', '_id': issueIDs[0]});

          // check if the issue was really updated
          chai
            .request(server)
            .get('/api/issues/functionalTests')
            .query({'_id': issueIDs[0]})
            .end((err, res) => {
              assert.notOk(err);
              assert.equal(res.status, 200);
              assert.equal(res.type, 'application/json');
              assert.equal(res.body[0].status_text, 'updated');
              done();
            });
        });
    });

    test('Update multiple fields on an issue', done => {
      chai
        .request(server)
        .put('/api/issues/functionalTests')
        .type('form')
        .send({
          '_id': issueIDs[1],
          'issue_title': 'Updated Issue',
          'issue_text': 'autogenerated update of an existing issue by chai.js',
          'status_text': 'updated'
        })
        .end((err, res) => {
          assert.notOk(err);
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.deepEqual(res.body, {'result': 'successfully updated', '_id': issueIDs[0]});

          // check if the issue was really updated
          chai
            .request(server)
            .get('/api/issues/functionalTests')
            .query({'_id': issueIDs[1]})
            .end((err, res) => {
              assert.notOk(err);
              assert.equal(res.status, 200);
              assert.equal(res.type, 'application/json');
              assert.includeMembers(res.body[0], {
                '_id': issueIDs[1],
                'issue_title': 'Updated Issue',
                'issue_text': 'autogenerated update of an existing issue by chai.js',
                'created_by': 'chai test suite',
                'status_text': 'updated'
              });
              done();
            });
        });
    });

    test('Update an issue with missing _id', done => {
      chai
        .request(server)
        .put('/api/issues/functionalTests')
        .type('form')
        .send({
          'status_text': 'updated'
        })
        .end((err, res) => {
          assert.notOk(err);
          assert.equal(res.type, 'application/json');
          assert.deepEqual(res.body, { 'error': 'missing _id' });
          done();
        });
    });

    test('Update an issue with no fields to update', done => {
      chai
        .request(server)
        .put('/api/issues/functionalTests')
        .type('form')
        .send({
          '_id': issueIDs[1]
        })
        .end((err, res) => {
          assert.notOk(err);
          assert.equal(res.type, 'application/json');
          assert.deepEqual(res.body, { 'error': 'no update field(s) sent', '_id': issueIDs[1] });
          done();
        });
    });

    test('Update an issue with an invalid _id', done => {
      chai
        .request(server)
        .put('/api/issues/functionalTests')
        .type('form')
        .send({
          '_id': 'invalid id',
          'status_text': 'updated'
        })
        .end((err, res) => {
          assert.notOk(err);
          assert.equal(res.type, 'application/json');
          assert.deepEqual(res.body, { 'error': 'could not update', '_id': 'invalid id' });
          done();
        });
    });
  });

  suite('Deleting issues', () => {
    test('Delete an issue', done => {
      chai
        .request(server)
        .delete('/api/issues/functionalTests')
        .type('form')
        .send({'_id': issueIDs[0]})
        .end((err, res) => {
          assert.notOk(err);
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.deepEqual(res.body, { 'result': 'successfully deleted', '_id': issueIDs[0] });

          // check if the issue was really deleted
          chai
            .request(server)
            .get('/api/issues/functionalTests')
            .query({'_id': issueIDs[0]})
            .end((err, res) => {
              assert.notOk(err);
              assert.equal(res.status, 200);
              assert.equal(res.type, 'application/json');
              assert.isArray(res.body);
              assert.equal(res.body.length, 0);
              done();
            });
        });
    });

    test('Delete an issue with an invalid _id', done => {
      chai
        .request(server)
        .delete('/api/issues/functionalTests')
        .type('form')
        .send({'_id': 'invalid ID'})
        .end((err, res) => {
          assert.notOk(err);
          assert.equal(res.type, 'application/json');
          assert.deepEqual(res.body, { 'error': 'could not delete', '_id': 'invalid ID' });
          done();
        });
    });

    test('Delete an issue with missing _id', done => {
      chai
        .request(server)
        .delete('/api/issues/functionalTests')
        .end((err, res) => {
          assert.notOk(err);
          assert.equal(res.type, 'application/json');
          assert.deepEqual(res.body, { 'error': 'missing _id' });
          done();
        });
    });
  });
});
