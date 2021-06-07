import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {type: String, required: [true, 'Enter the movie title!'] },
    summary: {type: String, required: [true, 'Enter the movie summary!'] },
    year: {type: Number, required: [true, "Enter the year of tne movie!"] },
    rating: {type: Number, required: [true, "Enter the movie's rating!"] },
    genres: [{ type:String, required: [true, "Enter the movie genre!"] }]
});

const movie = mongoose.model( "movie", movieSchema );
export default movie;