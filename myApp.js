var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//1- Meet the node console
console.log('Hello World');

//2- A first working express server
app.get("/", (req, res) => {
  res.send('Hello Express');
});

//3- Serve an HTML file
app.get("/", function(req, res){
  res.sendFile(__dirname+"/views/index.html");
});

//4- Serve static assets
app.use("/public", express.static(__dirname+"/public"));

//5-Serve JSON on a specific route
//6- .env files 
app.use("/json", (req, res) => {
  const mySecret = process.env.MESSAGE_STYLE;
  var obj = {"message":"Hello json"};
  if( mySecret === "uppercase"){
    const response = obj.message.toUpperCase();
    obj.message = response;
  }
  res.json(obj);
});

//7- Implement root-level request Middleware
app.use(function(request, response, next){
  const { method, path } = request;
  const ip = '127.0.0.1';
  console.log(`${method} ${path} - ${ip}`);
  next();
});

//8- Chain Middleware to create a time server
app.get('/now',
(req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req,res) => {
    res.json({
      time: req.time
    });
  }
);

//9- Get route parameter input from the client
app.get('/:word/echo', (req, res) => {
  const { params } = req;
  res.json({echo: params.word});
});

//10- get query parameter input from the client
app.get('/name', (request, response) => {
  const { first, last } = request.query;
  response.json({
    name: `${first} ${last}`
  })
});

//11- Use body-parser to parse post requests
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(__dirname+"/public"));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/views/index.html");
});

//12-get data from post requests
app.post('/name', (request, response) => {
  const { first, last } = request.body;
  response.json({
    name: `${first} ${last}`
  });
});



 module.exports = app;
