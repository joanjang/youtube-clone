import express from "express";
import mogran from "morgan";

const app = express();

app.use( mogran( "dev" ) );

app.get( "/", ( req, res ) => res.send( "I love middlewares" ) );
app.get( "/protected", ( req, res ) => res.send( "Welcome to the private lounge" ) );

app.listen( 4000 );
