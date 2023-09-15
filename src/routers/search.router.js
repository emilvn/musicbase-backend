import { getAllSearchReq } from "../controllers/search.controller.js";

import express from "express";

export const searchRouter = express.Router();

searchRouter.get("/", getAllSearchReq);