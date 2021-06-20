import express from "express";
import { logout, getEdit, postEdit, remove, startGithubLogin, finishGithubLogin, see } from "../controllers/userController";
import { avatarUpload } from "../middlewares";

const userRouter = express.Router();

userRouter.get( "/logout", logout );
userRouter.route( "/edit" ).get( getEdit ).post( avatarUpload.single( "avatar" ), postEdit );
userRouter.get( "/delete", remove );
userRouter.get( "/github/start", startGithubLogin );
userRouter.get( "/github/finish", finishGithubLogin );
userRouter.get( ":id", see );

export default userRouter;