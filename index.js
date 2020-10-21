// import express (after npm install express)
const express = require('express');

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


// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});