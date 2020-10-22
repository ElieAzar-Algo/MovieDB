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
//-------------------------step 6-----------------------------------------//
///movies/read/by-date    /movies/read/by-rating    /movies/read/by-title //
//------------------------------------------------------------------------//
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
//-------------------------step 7-----------------------------------------//
//                     /movies/read/id/<ID>                               //
//------------------------------------------------------------------------//

app.get('/movies/read/id/:id', (req, res) => {
  let id=(req.params.id)-1;
  if(!movies[id]){
  res.status(404).send({error:true,message:"the movie "+(id+1)+' does not exist '});}
  else{
    res.status(200).send(movies[id]);
  }
});
//-------------------------step 8-----------------------------------------//
//       /movies/add?title=<TITLE>&year=<YEAR>&rating=<RATING>            //
//------------------------------------------------------------------------//
app.get('/movies/add', (req, res) => {
  const newTitle=req.query.title;
  const newYear= parseInt(req.query.year);
  const newRating=req.query.rating;
  const allMovies={data:movies};
  if(newTitle==""||newTitle==undefined||  //missing title
     newYear==""||newYear==undefined||    //missing year
     newYear<1000||newYear>9999||(!newYear)){  //unacceptable year value
    res.status(200).send({error:true+" You cannot create a movie without providing s title and a year "});
  }else if(newRating==""||newRating==undefined){
   
   movies.push({title:newTitle,year:newYear,rating:4})
   res.status(200).send(allMovies);
  }
  else{
  movies.push({title:newTitle,year:newYear,rating:newRating})
    res.status(200).send(allMovies);
  }
  
});











// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});