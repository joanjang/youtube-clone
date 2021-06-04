import express from "express";
import { home, movieDetail, getAdd ,postAdd } from "./movieController";

const movieRouter = express.Router();

movieRouter.get( "/", home );
movieRouter.get( "/:id(\\d+)", movieDetail );
movieRouter.route( "/add" ).get( getAdd ).post( postAdd );

export default movieRouter;
