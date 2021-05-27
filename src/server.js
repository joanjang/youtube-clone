import express from "express";
import morgan from "morgan";

const app = express();
const logger = morgan("dev");

app.use( logger );

const globalRouter = express.Router();
const handleHome = ( req, res ) => res.send( "HOME" ); 
globalRouter.get( "/", handleHome );

const userRouter = express.Router();
const handleEditUser = ( req, res ) => res.send( "Edit User" ); 
userRouter.get( "/edit", handleEditUser );

const videoRouter = express.Router();
const handleWatchVideo = ( req, res ) => res.send( "Watch Video" ); 
videoRouter.get( "/watch", handleWatchVideo );

app.use( "/", globalRouter );
app.use( "/users", userRouter );
app.use( "/videos", videoRouter );

app.listen( 4000 );
