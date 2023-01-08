const express = require('express');
const app = express();


app.use(express.json());
const { check, validationResult } = require('express-validator');

const db = [
  {
    id: 1,
    name: 'Marcus Dev',
    email: 'marcus@salt.dev'
  },
  {
    id: 2,
    name: 'Elton Kornmann',
    email: 'elton.kornmann@appliedtechnology.se'
  },
];

let nextId = db[db.length - 1].id;
let indexCounter = 0;



// get redirected if someone requests homepage
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/static/simple-fetch-setup.html');
});

// GET DB OBJECT  
app.get('/api/developers/', (req, res) => {
  res
    .status(200)
    .json(db);
});


// POST
app.post('/api/developers/', [
  check('name').escape().isString(),
  check('email').isEmail()],

  (req, res) => {

    //error handler
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    //put in in the database

    const newDev = {
      id: ++nextId,
      name: req.body.name,
      email: req.body.email,
    }

    db.push(newDev);


    res
      .status(201)
      .setHeader('location', `/api/developers/${newDev.id}`)
      .set('Accept', 'application/json')
      .json(newDev);
  });


// GET
app.get('/api/developers/:id', (req, res) => {

  const reqDev = db.find(i => i.id == req.params.id);
  return reqDev ?
    // match
    res
      .status(200)
      .setHeader('Location', `/api/developers/${req.params.id}`)
      .json(reqDev) :
    // no match
    res
      .status(404).end('Developer not found')
});


// DELETE
app.delete('/api/developers/:id', (req, res) => {

  const dev = db.find(i => i.id == req.params.id);

  if (!dev) {
    res.status(404).end('Developer not found');
    return;
  }


  const index = db.indexOf(dev);
  db.splice(index, 1);
  --indexCounter;
  // rearrange indexnr

  res
    .status(204)
    .setHeader('location', `/api/developers/${dev.id}`)
    .json(dev)

});

// PATCH
app.patch('/api/developers/:id', [
  check('name').escape().isString(),
  check('email').isEmail()],
  (req, res) => {
    //find id
    const devId = parseInt(req.params.id);
    const dev = db.find(i => i.id == devId);

    if (!dev) {
      res.status(404).send('Developer not found');
      return;
    }


    if (req.body.id) {
      if (parseInt(req.body.id) !== parseInt(req.params.id)) {
        res.status(400).send('Cannot update your user ID, please try again')
        return;
      }
    }


    dev.name = req.body.name;
    dev.email = req.body.email;
    res
      .status(201)
      .setHeader('location', `/api/developers/${dev.id}`)
      .set('Content-Type', 'application/json')
      .json(dev);

  });


module.exports = {
  app,
  db,
  nextId,
  indexCounter,
} 