const express = require('express');
const dataServer = express();
dataServer.use(express.json());

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
  }
];

// get redirected if someone requests homepage
dataServer.get('/', function(req, res) {
  res.sendFile(__dirname + '/static/devsNotFound.html');
});

// get db object with all devs 
dataServer.get('/api/developers/', (req, res) => {
res
  .status(200)
  .json(db);
});


// POST
dataServer.post('/api/developers/', (req, res) => {
  
      const newDev = {
              id: db.length + 1,
              name: req.body.name,
              email: req.body.email,
            };
      
            db.push(newDev);
      
          res
           .status(201)
           .setHeader('location', `/api/developers/${newDev.id}`)
           .json(newDev);
      });
      

// GET
dataServer.get('/api/developers/:id', (req, res) => {
  
  const reqDev = db.find(i => i.id == req.params.id);
  return reqDev ? 
  // match
    res
    .status(200)
    .setHeader('location', `/api/developers/${req.params.id}`)   
    .json(reqDev) :    
  // no match
        res
        .status(404).end('Developer not found')
     });


// DELETE
dataServer.delete('/api/developers/:id', (req, res) => {
  
        const dev = db.find(i => i.id == req.params.id);

        if (!dev) {
          res.status(404).end('Developer not found');
          return;
        }
       
        const index = db.indexOf(dev);
        db.splice(index, 1);
        res
        .status(204)
        .setHeader('location', `/api/developers/${dev.id}`)   
        .json(dev)        
             
      });
   
// PATCH
dataServer.patch('/api/developers/:id', (req, res) => {

      const devId = parseInt(req.params.id);
      const dev = db.find(i => i.id == devId);
        
      if (!dev) {
        res.status(404).send('Developer not found');
        return;
      }

      if (req.body.id !== devId) {
         res.status(400).send('Cannot update your user ID, please try again')
         return;
      }

      dev.name = req.body.name;
      dev.email = req.body.email;
      res
      .status(201)
      .setHeader('location', `/api/developers/${dev.id}`)
      .json(dev);
    
    });


const port = 3000

dataServer.listen(port, () => {
    console.log('Lekker bezig El.')
});