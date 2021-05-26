import express from "express";

const app = express();
const gossipMiddleware = (req, res, next) => {
    console.log( `Someone is going to: ${req.url}` );
    next();
}

app.get( "/", gossipMiddleware, ( req, res ) => res.send( "Here is HomePage" ) );

app.listen( 4000 );
