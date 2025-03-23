import express from "express";

import { UpdateUserProfile } from "../controllers/userProfileController";
import { verifyAuthentication } from "../middlewares/veriftyAuthentication";

const Router = express.Router();

Router.route("/update-profile").patch(verifyAuthentication,UpdateUserProfile)

export default Router;