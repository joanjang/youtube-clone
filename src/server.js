import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouters";
import videoRouter from "./routers/videoRouters";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan( "dev" );

app.set( "view engine", "pug") ;
app.set( "views", process.cwd() + "/src/views" );
app.use( logger );
app.use( express.urlencoded( { extended: true } ) );

app.use( session ( {
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL })
} ) );

app.use( localsMiddleware );
app.use( "/uploads", express.static("uploads") );
app.use( "/assets", express.static("assets") );
app.use( "/", rootRouter );
app.use( "/users", userRouter );
app.use( "/videos", videoRouter );
app.use( "/api", apiRouter );

export default app;