import express from "express";

import { start } from "../controllers/startController";

const Router = express.Router();

Router.route("/").get(start);

export default Router;
