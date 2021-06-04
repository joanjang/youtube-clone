import { getMovieById, getMovies, addMovie } from "./db";

export const home = (req, res) => res.render( "movies", { movies: getMovies(), pageTitle: "Movies!" } );

export const movieDetail = (req, res) => {
  const {
    params: { id }
  } = req;
  const movie = getMovieById(id);
  if (!movie) {
    res.render("404", { pageTitle: "Movie not found" });
  }
  return res.render("detail", { movie });
};

export const getAdd = (req, res) => res.render( "add", { pageTitle: "Add Movie" } );
export const postAdd = (req, res) => {
  const { title, synopsis, genres } = req.body; 
  const genre = genres.split( "," );

  addMovie( { title, synopsis, genres: genre } );
  return res.redirect("/");
};