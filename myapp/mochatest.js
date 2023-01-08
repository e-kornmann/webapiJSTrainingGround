const assert = require('assert');
const request = require('supertest');
const { app, db } = require('./api.js');

let nextId = db[db.length-1].id;
let indexCounter = db.length - 1;

//=1
describe('1. developer API should have endpoints to', () => {

  it('get all developers', function(done) {
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
  it('get the last developers by ID request', function(done) {
    // arrange
    
    // act and assert
    request(app)
      .get(`/api/developers/${nextId}`)
      .set('Accept', /application\/json/)
      .expect('Content-Type', /json/)
      .expect('location', `/api/developers/${nextId}`)
      .expect((res) => {
        assert.strictEqual(JSON.stringify(res.body), JSON.stringify(db[indexCounter]))})  
      .expect(200, done);
  });
//=3
  it('get a succesfull develeper subscrition', function(done) {
    // arrange
    let id = ++nextId;
    
    // act and assert
    request(app)
      .post('/api/developers/')
      .send({"name":"Beatrice Dev","email":"bea@salt.dev"})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect('location', `/api/developers/${id}`)
      .expect((res) => {
        assert.strictEqual(JSON.stringify(res.body), JSON.stringify(db[++indexCounter]))})  
        .expect((res) => {
          assert.strictEqual(res.body.name, 'Beatrice Dev')})          
      .expect(201, done);
  });
  //=4
  it('deletete a misfunctional developer', function(done) {
    //curl -X DELETE http://localhost:3000/api/developers/2 -i
    // arrange
    const id = 2;
   
    // act and assert
    request(app)
      .delete(`/api/developers/${id}`)
      .expect('location', `/api/developers/${id}`)
      .expect((res) => {
        assert.strictEqual(JSON.stringify(res.body), JSON.stringify({}))})  
      .expect(204, done);   
  });
//=5*/
  it('update a succesfull develeper subscrition', function(done) {
    // arrange
 
    const data = { 
      name: "Beatrice Dev",
      email: "bea@salt.dev",
    }
    // act and assert
    request(app)
     .patch(`http://localhost:3000/api/developers/1`)
     .send(data)
     .set('Accept', 'application/json')
      
   //.patch('/api/developers/1')
  // .send({ name: 'John', email: 'john@example.com' })
  //  .expect('location', `/api/developers/${id}`)
  //  .expect('Content-Type', /json/)
    .expect((res) => {
      assert.strictEqual(data.name, 'Beatrice Dev')})
    .expect(200, done);
  });
 });
/*
    .patch('/api/developers/2')
    //.set('Accept', 'application/json')
    .send({name: 'John', email: 'john@salt.dev'})
    //.expect('Content-Type', /json/)
  // .expect('location', '/api/developers/2')
    .expect((res) => {
      assert.strictEqual(app.name, "John");
    })
    .expect(201, done);
  
  });
});

    /*
    // act and assert
    request(app)
      .patch(`/api/developers/:id`)
      .expect('location', `/api/developers/${id}`)
      .send({"name":"Beatrice Dev","email":"bea@salt.dev"})
      .expect((res) => {
    //    assert.strictEqual(res.body),(db[1])})  
     //   .expect((res) => {
         assert.strictEqual(res.body.name, 'Beatrice Torenstra')})          
      .expect(201, done);
  });

});


  /*
});





/*

ALTERNATIVELY

// arrange
  const api = require('./api.js');

// act and assert
  request(api.app)

*/


// run test commandline: npx mocha mochatest.js

