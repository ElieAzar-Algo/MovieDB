const e = require('express');
// import express (after npm install express)
const express = require('express');
const { restart } = require('nodemon');

// create new express app and save it as "app"
const app = express();

// server configuration
const PORT = 3000;

// create a route for the app
app.get('/', (req, res) => {
  res.send('ok');
});

app.get('/test', (req, res) => {
    res.status(200).send('message:"ok"');
  });
  var date=new Date();
  app.get('/time', (req, res) => {
    res.status(200).send(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
  });

  app.get('/hello', (req, res) => {
    res.status(200).send('Hello')
   });

  app.get('/hello/:id', (req, res) => {
   res.status(200).send('Hello '+req.params.id)
  });


  app.get('/search', (req, res) => {
  if (req.query.s==""||req.query.s==undefined){
      res.status(500).send('you have to provide a search');
  }else{
    res.status(200).send('ok '+req.query.s)}
   });


// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});