import express from "express";

const app = express();
const logger = (req, res, next) => {
    console.log( `${req.method} ${req.url}` );
    next();
};

const privateMiddleware = ( req, res, next ) => {
    const url = req.url;
    if( url === "/protected" ) {
        return res.send( "<H1>Not Allowed</H1>");
    }
    
    console.log( "Allowed, you may continue." );
    next();
};

app.use( logger );
app.use( privateMiddleware );

app.get( "/", ( req, res ) => res.send( "I love middlewares" ) );
app.get( "/protected", ( req, res ) => res.send( "Welcome to the private lounge" ) );

app.listen( 4000 );
