import express from "express";
import { upload, watch, edit, deleteVideo } from "../controllers/videoController"

const videoRouter = express.Router();

videoRouter.get( "/upload", upload );
videoRouter.get( "/:id(\\d+)", watch );
videoRouter.get( "/:id(\\d+)/edit", edit );
videoRouter.get( "/:id(\\d+)/delete", deleteVideo );

export default videoRouter;