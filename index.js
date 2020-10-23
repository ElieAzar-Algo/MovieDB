const e = require('express');
const bodyParser = require('body-parser');
const dburl = require('./config/db');
// import express (after npm install express)
const express = require('express');
const {
  restart
} = require('nodemon');
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(dburl.url, (err, database) => {
  if (err) return console.log(err)
  else {


    // create new express app and save it as "app"
    const app = express();
    app.use(bodyParser.json());
    // server configuration
    const PORT = 3000;

    // create a route for the apps
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
        res.status(200).send({
          data: sortByTitle
        });
      } else {
        res.status(200).send("error");
      }
    });
    //-------------------------step 7-----------------------------------------//
    //                     /movies/read/id/<ID>                               //
    //------------------------------------------------------------------------//

    app.get('/movies/:id', (req, res) => {
      let id = (req.params.id) - 1;
      if (!movies[id]) {
        res.status(404).send({
          error: true,
          message: "the movie " + (id + 1) + ' does not exist '
        });
      } else {
        res.status(200).send(movies[id]);
      }
    });
    //-------------------------step 8-----------------------------------------//
    //       /movies/add?title=<TITLE>&year=<YEAR>&rating=<RATING>            //
    //------------------------------------------------------------------------//
    app.post('/movies', (req, res) => {
      const newTitle = req.body.title;
      const newYear = parseInt(req.body.year);
      const newRating = req.body.rating;

      
        if (newTitle == "" || newTitle == undefined || //missing title
          newYear == "" || newYear == undefined || //missing year
          newYear < 1000 || newYear > 9999 || (!newYear)) //unacceptable year value
        {
          res.status(403).json({message: "You cannot create a movie without providing s title and a year"});
          return;
        } else if (newRating == "" || newRating == undefined) {

          movies.push({
          title:newTitle,
          year:newYear,
          rating: 4});
          res.status(200).send(movies);
        
      }else{

        movies.push({
          title:newTitle,
          year:newYear,
          rating: newRating});
          res.status(200).send(movies);
        }
      });

//-------------------------------step 12/13 -----------------------------------------//
//                                NOT WORK                                           //
//-----------------------------------------------------------------------------------//
    // db.collection('movies').insert(movie, (err, result) => {
    //   if (err) {
    //     res.status(500).send({
    //       error: true + " You cannot create a movie without providing s title and a year "
    //     });

    //   } else {
    //     res.status(200).send(result);

    //   }
    // });





    //--------------------------------------step 9-----------------------------------------//
    //                               movies/delete/<ID>                                    //
    //-------------------------------------------------------------------------------------//
    app.delete('/movies/:id', (req, res) => {
      let id = (req.params.id) - 1;
      const allMovies = {
        data: movies
      };
      if (!movies[id]) {
        res.status(404).send({
          error: true,
          message: "the movie " + (id + 1) + ' does not exist '
        });
      } else {
        movies.splice(id, 1);
        res.status(200).send(allMovies);
      }
    });

    //--------------------------------------step 10----------------------------------------------------//
    ///movies/update/<ID>?title=<NEW_TITLE>  /movies/update/<ID>?title=<NEW_TITLE>&rating=<NEW_RATING> //
    //-------------------------------------------------------------------------------------------------//

    app.put('/movies/:id', (req, res) => {
      const selectId = (req.params.id) - 1;
      const newTitle = req.body.title;
      const newRating = req.body.rating;
      //console.log(req.body.title);

      if (!movies[selectId]) {
        res.status(404).send({
          error: true,
          message: "the movie " + (selectId + 1) + ' does not exist '
        });
      } else if ((newTitle == "" || newTitle == undefined) && (newRating == "" || newRating == undefined)) {
        res.status(200).send({
          data: movies
        });
      } else if (newTitle == "" || newTitle == undefined) {
        movies[selectId].rating = newRating;
        res.status(200).send({
          data: movies
        });
      } else if (newRating == "" || newRating == undefined) {
        movies[selectId].title = newTitle;
        res.status(200).send({
          data: movies
        });
      } else {
        movies[selectId].title = newTitle;
        movies[selectId].rating = newRating;
        res.status(200).send({
          data: movies
        });
      }
    });



    // make the server listen to requests
    app.listen(PORT, () => {
      console.log(`Server running at: http://localhost:${PORT}/`);
    });
  }
});