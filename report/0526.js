import express from "express";

const app = express();
const URLLogger = (req, res, next) => {
    console.log( `Path: ${req.path}` );
    next();
};

const timeLogger = ( req, res, next ) => {
    const date = new Date( Date.now() );

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    console.log( `Time: ${year}. ${month}. ${day}` );
    next();
}

const securityLogger = ( req, res, next ) => {
    if( req.protocol !== "https" ) {
        console.log( "Insecure ❌❌" );
    }
    else {
        console.log( "Secure ❕❕" );
    }
    
    next();
}

const proetectorMiddleware = ( req, res, next ) => {
    if( req.url === "/protected" ) {
        return res.send( "<H1>Not Allowed</H1>");
    }
    
    next();
}

app.use( URLLogger, timeLogger, securityLogger, proetectorMiddleware );

app.get( "/", ( req, res ) => res.send( "I love middlewares" ) );
app.get( "/privated", ( req, res ) => res.send( "Welcome to the private lounge" ) );

app.listen( 4000 );