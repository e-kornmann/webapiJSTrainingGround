const http = require('http');
const fs = require('fs')



  
const server = http.createServer((req, res) => {



   


    const fileNameOfUrl = url => {
        let fileName = '';
        if(url.split('/')[1] === '') {
          fileName = 'index.html'
        } else {
          fileName = url.split('/')[1]
        }
        return fileName;
      }
    
    const fileName = fileNameOfUrl(req.url);
     
    
    const getFileContentOr404 = (fileName) => {
        if(!fs.existsSync(`./static/${fileName}`)) {
            fileName = '404.html';
        }

        return fs.readFileSync(`./static/${fileName}`, 'utf-8');
    }
  console.log(`The URL for the request was '${req.url}'`);
  console.log(`The Method for the request was '${req.method}'`);

  
  
  try {
    const content = getFileContentOr404(fileName);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(content);
  } catch (error) {
    if (fileName === 'favicon.ico') {
        res.statusCode = 404;
        res.end('jij zoekt icoon');
        return;
      }
    if (error.code === 'ENOENT') {
      res.statusCode = 404;
      res.end('File not found');
   
    } else {
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }

 }



);



const hostname = 'localhost';
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});