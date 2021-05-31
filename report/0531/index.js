import express from "express";
import globalRouter from "./routers/globalRouter";
import storyRouter from "./routers/storyRouter";
import userRouter from "./routers/userRouter";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/report/0531/views");

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/stories", storyRouter);

// Codesanbox does not need PORT :)
app.listen(4000, () => console.log(`Listening!`));
