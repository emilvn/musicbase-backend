import {searchAlbums, searchArtists, searchTracks} from "../controllers/search.controller.js";

import express from "express";

export const searchRouter = express.Router();

// search routes
searchRouter.get("/artists", searchArtists);
searchRouter.get("/albums", searchAlbums);
searchRouter.get("/tracks", searchTracks);