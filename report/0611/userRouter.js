import express from "express";
import { home, getJoin, postJoin, getLogin, postLogin } from "./userController";

const userRouter = express.Router();

userRouter.get("/", home);
userRouter.route("/join").get(getJoin).post(postJoin);
userRouter.route("/login").get(getLogin).post(postLogin);

export default userRouter;
