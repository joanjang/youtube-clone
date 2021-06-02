import {
  getMovieById,
  getMovies,
  getMovieByMinimumRating,
  getMovieByMinimumYear
} from "./db";

export const home = (req, res) => {
  const movies = getMovies();
  return res.render( "home", { pageTitle: "Movies!", movies, search: true } );
};
export const movieDetail = (req, res) => {
  const { id } = req.params;
  const movie = getMovieById( id );
  return res.render( "detail", { pageTitle: movie.title, movie, search: false } );
};
export const filterMovie = (req, res) => {
  const { year, rating } = req.query;
  let movies, pageTitle;
  if( year !== "" ) {
    movies = getMovieByMinimumYear( year );
    pageTitle = `Searching by year: ${year}`;
  }
  else if( rating !== "" ) {
    movies = getMovieByMinimumRating( rating );
    pageTitle = `Searching by rating: ${rating}`;
  }

  return res.render( "filter", { pageTitle, movies, search: true } );
};