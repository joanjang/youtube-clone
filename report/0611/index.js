import "./db";
import "./models/User";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import session from "express-session";
import userRouter from "./userRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true
  })
);

app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
  });
});

app.use(localsMiddleware);
app.use("/", userRouter);

// Codesanbox does not need PORT :)
app.listen(4000, () => console.log(`✅  Server Ready!`));
