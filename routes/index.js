const express = require('express');
const router  = express.Router();
const Movie   = require('../models/Movie.model');

/* GET home page */
router.get('/', (req, res) => {
  res.render('index');
});


// "/movies" => means "localhost:3000/movies"
router.get('/movies', (req, res) => {
  Movie
    .find()
    .then(moviesFromDB => res.render('../views/movies', { moviesFromDB }))
    .catch(err => res.status(500).send(err));
});

// "/movie/:movieId" means "localhost:3000/movies/123lks5y0" being "123lks5y0" changeable and dependent on which movie details we want to see
// anything that comes after ":" in the URL can be taken through req.params
router.get('/movie/:movieId', (req, res) => {
  Movie
    // .findById() will always give us back an OBJECT (one element at the time)
    .findById(req.params.movieId)
    .then(theMovie => {
      console.log(theMovie);

      // we have to navigate to "movie.hbs" that is a page saved in the "movies-pages" folder 
      //                   we are passing the object from the DB to the hbs
      //                                    |
      res.render('../views/details', { theMovie } );
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;