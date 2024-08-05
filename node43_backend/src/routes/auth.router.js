import express from "express";
import {
  forgetCheckCode,
  forgetCheckEmail,
  login,
  loginFacebook,
  signUp,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signUp);

authRouter.post("/login", login);

authRouter.post("/login-face", loginFacebook);

authRouter.post("/forget-check-email", forgetCheckEmail);

authRouter.post("/forget-check-code", forgetCheckCode);

export default authRouter;
