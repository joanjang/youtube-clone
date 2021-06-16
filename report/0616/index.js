import express from "express";
import path from "path";
import bodyParser from "body-parser";
import multer from "multer";
import fs from "fs";

const app = express();
const fileUpload = multer( { dest: "uploads/" } );

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.get( "/", ( req, res ) => res.render( "home" ) );
app.post( "/read", fileUpload.single("textFile"), ( req, res ) => {
    const { file } = req;
    fs.readFile( file.path, 'utf8', ( err, data ) => {
        if( err )
            return res.redirect( "/" );
        return res.render( "read", { content: data } );
    } );
} );

// Codesanbox does not need PORT :)
app.listen(4000, () => console.log(`Listening!`));