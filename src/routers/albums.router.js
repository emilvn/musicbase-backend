import { 
  getAllAlbums, 
  getSpecificAlbum, 
  addAlbum, 
  updateAlbumByID, 
  deleteAlbumByID 
} from "../controllers/albums.controller.js";

import express from "express";

export const tracksRouter = express.Router();

//handle the routing
tracksRouter.get("/", getAllAlbums)
tracksRouter.get("/:id", getSpecificAlbum)
tracksRouter.post("/", addAlbum)
tracksRouter.put("/:id", updateAlbumByID)
tracksRouter.delete("/:id", deleteAlbumByID)

