const assert = require('assert');
const request = require('supertest');
const { app, db } = require('./api.js');

let nextId = db[db.length - 1].id;
let indexCounter = db.length - 1;

//=1
describe('1. developer API should have endpoints to', () => {

  it('get all developers', function (done) {
    // act and assert
    request(app)
      .get('/api/developers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        assert.strictEqual(res.body.length, 2);
      })
      .expect(200, done);
  });
  //=2
  it('get the last developers by ID request', function (done) {
    // arrange

    // act and assert
    request(app)
      .get(`/api/developers/${nextId}`)
      .set('Accept', /application\/json/)
      .expect('Content-Type', /json/)
      .expect('location', `/api/developers/${nextId}`)
      .expect((res) => {
        assert.strictEqual(JSON.stringify(res.body), JSON.stringify(db[indexCounter]))
      })
      .expect(200, done);
  });
  //=3
  it('get a succesfull develeper subscrition', function (done) {
    // arrange
    let id = ++nextId;

    // act and assert
    request(app)
      .post('/api/developers/')
      .send({ "name": "Beatrice Dev", "email": "bea@salt.dev" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect('location', `/api/developers/${id}`)
      .expect((res) => {
        assert.strictEqual(JSON.stringify(res.body), JSON.stringify(db[++indexCounter]))
      })
      .expect((res) => {
        assert.strictEqual(res.body.name, 'Beatrice Dev')
      })
      .expect(201, done);
  });
  //=4
  it('deletete a misfunctional developer', function (done) {
    //curl -X DELETE http://localhost:3000/api/developers/2 -i
    // arrange
    const id = 2;

    // act and assert
    request(app)
      .delete(`/api/developers/${id}`)
      .expect('location', `/api/developers/${id}`)
      .expect((res) => {
        assert.strictEqual(JSON.stringify(res.body), JSON.stringify({}))
      })
      .expect(204, done);
  });
  //=5
  it('update a succesfull develeper subscrition', function (done) {
    // arrange
    const id = 1;

    const data = {
      name: "Beatrice Dev",
      email: "bea@salt.dev",
    }
    // act and assert
    request(app)
      .patch(`/api/developers/${id}`)
      .send(data)
      .set('Asset', 'application/json')
      .expect('Content-Type', /json/)
      //.patch('/api/developers/1')
      .expect('location', `/api/developers/${id}`)
      .expect((res) => {
        assert.strictEqual(res.body.name, 'Beatrice Dev')
      })
      .expect(201, done);
  });
});



/*

ALTERNATIVELY

// arrange
  const api = require('./api.js');

// act and assert
  request(api.app)

*/


// run test commandline: npx mocha mochatest.js

