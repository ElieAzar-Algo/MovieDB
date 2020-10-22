const e = require('express');
// import express (after npm install express)
const express = require('express');
const {
  restart
} = require('nodemon');

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
var date = new Date();
app.get('/time', (req, res) => {
  res.status(200).send(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
});

app.get('/hello', (req, res) => {
  res.status(200).send('Hello')
});

app.get('/hello/:id', (req, res) => {
  res.status(200).send('Hello ' + req.params.id)
});


app.get('/search', (req, res) => {
  if (req.query.s == "" || req.query.s == undefined) {
    res.status(500).send('you have to provide a search');
  } else {
    res.status(200).send('ok ' + req.query.s)
  }
});
//-----------------------------basis for CRUD----------------------------------------------
const movies = [{
    title: 'Jaws',
    year: 1975,
    rating: 8
  },
  {
    title: 'Avatar',
    year: 2009,
    rating: 7.8
  },
  {
    title: 'Brazil',
    year: 1985,
    rating: 8
  },
  {
    title: 'الإرهاب والكباب‎',
    year: 1992,
    rating: 6.2
  }
];

app.get('/movie/create', (req, res) => {
  res.status(200).send(' ')
});

app.get('/movie/read/:action', (req, res) => {

  if (req.params.action == "by-date") {
    const sortByDate = movies.sort((a, b) => (a.year > b.year) ? 1 : -1)
    res.status(200).send({
      data: sortByDate
    });
  } else if (req.params.action == "by-rating") {
    const sortByRating = movies.sort((a, b) => (a.rating > b.rating) ? 1 : -1);
    res.status(200).send({
      data: sortByRating
    });
  } else if (req.params.action == "by-title") {
    const sortByTitle = movies.sort((a, b) => (a.rating > b.rating) ? 1 : -1);
    res.status(200).send({data: sortByTitle});
  } else {
    res.status(200).send("error");
  }
});

app.get('/movie/create', (req, res) => {
  res.status(200).send('error');
});

app.get('/movie/delete', (req, res) => {
  res.status(200).send(' ')
});



app.get('/movies/read/id/:id', (req, res) => {
  let id=(req.params.id)-1;
  if(!movies[id]){
  res.status(404).send({error:true,message:"the movie "+(id+1)+' does not exist '});}
  else{
    res.status(200).send(movies[id]);
  }
});

//-------------------Global Compare Function-------------------------------------------- 

//const sortByRating=
//--------------------------sorting  data-------------------------------


//   app.get('/movies/read', (req, res) => {
//    // const sortByDate=

//   if (req.query.s=="by-date"){
//     console.log(sortByDate)
//     //const date=sortByDate;
//       res.status(200).send('Sort By Date'+movies.sort((a,b)=>(a.year>b.year)?1:-1));

//   }else if (req.query.s=="by-rating"){  
//     console.log(sortByRating)
//       const rating=sortByRating;
//     res.status(200).send('Sort By Rating '+movies.sort((a,b)=>(a.rating>b.rating)?1:-1));
//    }
// else{
//     res.status(500).send('you have to provide a search');
//    }

//    });






// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});