import {searchArtists} from "../controllers/search.controller.js";

import express from "express";

export const searchRouter = express.Router();

searchRouter.get("/artists", searchArtists);
searchRouter.get("/albums", searchArtists);
searchRouter.get("/tracks", searchArtists);