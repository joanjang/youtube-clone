/*
You DONT have to import the Movie with your username.
Because it's a default export we can nickname it whatever we want.
So import Movie from "./models"; will work!
You can do Movie.find() or whatever you need like normal!
*/
import Movie from "./models/Movie";

export const home = async ( req, res ) => {
    try {
        const movies = await Movie.find( {} );
        console.log( movies );
        return res.render( "home", { pageTitle: "HOME", movies } );
    } catch( e ) {
        return res.render( "error", { pageTitle: "ERROR", errorMessage: e._message } );
    }
}
export const getUpload = ( req, res ) => {
    return res.render( "upload", { pageTitle: "Uploading" } ); 
}
export const postUpload = async ( req, res ) => {
    const { title, summary, year, rating, genres } = req.body;
    try{ 
        await Movie.create( {
            title,
            summary,
            year,
            rating,
            genres: genres.split( "," ).map( (item) => item.trim() )
        } );
        return res.redirect( "/" );
    } catch( e ) {
        return res.render( "upload", { pageTitle: "Uploading", e } );
    }
}
export const watch = async ( req, res ) => {
    const { id } = req.params;
    const movie = await Movie.findById( id );
    if( !movie )
        return res.render( "error", { pageTitle: "ERROR", errorMessage: "Movie not found" } );
    return res.render( "watch", { pageTitle: `WATCHING ${movie.title}`, movie } );
}
export const getEdit = async ( req, res ) => {
    const { id } = req.params;
    const movie = await Movie.findById( id );
    if( !movie )
        return res.render( "error", { pageTitle: "ERROR", errorMessage: "Movie not found" } );
    return res.render( "edit", { pageTitle: `EDITING ${movie.title}`, movie } );
}
export const postEdit = async ( req, res ) => {
    const { id } = req.params;
    const { title, summary, year, rating, genres } = req.body;
    if( await !Movie.exists( { _id: id } ) )
        return res.render( "error", { pageTitle: "ERROR", errorMessage: "Movie not found" } );
    
    await Movie.findByIdAndUpdate( id, {
        title, 
        summary,
        year,
        rating,       
        genres: genres.split( "," ).map( (item) => item.trim() )
    } );
    return res.redirect( `/movies/${id}`);
}
export const deleteMovie = async ( req, res ) => {
    const { id } = req.params;
    await Movie.findByIdAndDelete( id );
    return res.redirect( "/" );
}
export const search = async ( req, res ) => {
    const { keyword } = req.query;
    let movies = [];
    if( keyword ) {
        movies = await Movie.find( {
            title: {
                $regex: new RegExp( keyword, "i" )
            }
        });
    }
    return res.render( "search", { pageTitle: "SEARCH", movies } );
}