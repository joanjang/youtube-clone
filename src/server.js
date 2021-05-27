import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouters";
import userRouter from "./routers/userRouters";
import videoRouter from "./routers/videoRouters";

const app = express();
const logger = morgan("dev");

app.use( logger );

app.use( "/", globalRouter );
app.use( "/users", userRouter );
app.use( "/videos", videoRouter );

app.listen( 4000 );
