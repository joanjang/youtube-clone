import express from "express";
import { logout, getEdit, postEdit, remove, startGithubLogin, finishGithubLogin, getChangePassword, postChangePassword, see } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware, avatarUpload } from "../middlewares";

const userRouter = express.Router();

userRouter.get( "/logout", protectorMiddleware, logout );
userRouter.route( "/edit" ).all( protectorMiddleware ).get( getEdit ).post( avatarUpload.single( "avatar" ), postEdit );
userRouter.get( "/github/start", publicOnlyMiddleware, startGithubLogin );
userRouter.get( "/github/finish", publicOnlyMiddleware, finishGithubLogin );
userRouter.route( "/change-password" ).all( protectorMiddleware ).get( getChangePassword ).post( postChangePassword );
userRouter.get( "/:id", see );

export default userRouter;