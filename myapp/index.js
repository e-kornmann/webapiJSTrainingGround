const { app } = require('./api.js');
const { db } = require('./api.js');

const port = 3000

app.listen(port, () => {
      
});

/*

alternatively
const api = require('./api.js');

const port = 3000   

api.app.listen(port, () => {
    console.log('Lekker bezig El.')
});
*/
