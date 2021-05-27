import express from "express";

const globalRouter = express.Router();

const handleHome = ( req, res ) => res.send( "HOME" );
const handleJoin = ( req, res ) => res.send( "JOIN" );

globalRouter.get( "/", handleHome ); 
globalRouter.get( "/join", handleJoin ); 

export default globalRouter;