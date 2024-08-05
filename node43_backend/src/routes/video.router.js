import express from "express";
import {
  getVideo,
  getType,
  getVideoType,
  getVideoPage,
  getVideoDetail,
} from "../controllers/video.controller.js";
import { middleWareToken, verifyToken } from "../config/jwt.js";

const videoRouter = express.Router();

videoRouter.get("/get-video", middleWareToken, getVideo);

videoRouter.get("/get-type", getType);

videoRouter.get("/get-video-type/:typeId", getVideoType);

videoRouter.get("/get-video-page/:page", middleWareToken, getVideoPage);

videoRouter.get("/get-video-detail/:videoId", getVideoDetail);

export default videoRouter;
