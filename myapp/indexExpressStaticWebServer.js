const express = require('express')
const morgan = require('morgan');
const app = express()
const saltLogger = function (req, res, next) {
    console.log(`salt> ${req.method} - ${req.url}`)
    next();
  }
app.use(saltLogger);
app.use(morgan('tiny'));
app.use(express.static('static'));
const port = 3000


app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})