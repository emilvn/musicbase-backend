import {searchAlbums, searchArtists, searchTracks} from "../controllers/search.controller.js";

import express from "express";

export const searchRouter = express.Router();

searchRouter.get("/artists", searchArtists);
searchRouter.get("/albums", searchAlbums);
searchRouter.get("/tracks", searchTracks);