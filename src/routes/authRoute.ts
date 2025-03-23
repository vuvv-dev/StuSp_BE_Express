import express from "express";

import {Register,SignOut, SignIn, SignInWithGoogle} from "../controllers/authController";

const Router = express.Router();

Router.route("/register").post(Register);
Router.route("/sign-in").post(SignIn);
Router.route("/sign-in-google").post(SignInWithGoogle)
Router.route("/sign-out").post(SignOut);


export default Router;