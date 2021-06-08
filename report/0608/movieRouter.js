import express from "express";
import { home, getUpload, postUpload, watch, getEdit, postEdit, deleteMovie, search } from "./movieController";

const movieRouter = express.Router();

movieRouter.get( "/", home );
movieRouter.route( "/upload" ).get( getUpload ).post( postUpload );
movieRouter.get( "/movies/:id([0-9a-f]{24})", watch );
movieRouter.route( "/movies/:id([0-9a-f]{24})/edit" ).get( getEdit ).post( postEdit );
movieRouter.get( "/movies/:id([0-9a-f]{24})/delete", deleteMovie );
movieRouter.get( "/search", search );

export default movieRouter;
