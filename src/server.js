import express from "express";

const app = express();

app.get( "/", ( req, res ) => res.send( "Here is HomePage" ) );
app.get( "/about", ( req, res ) => res.send( "Here is AboutPage" ) );
app.get( "/contact", ( req, res ) => res.send( "Here is ContactPage" ) );
app.get( "/login", ( req, res ) => res.send( "Here is LoginPage" ) );

app.listen( 4000 );
