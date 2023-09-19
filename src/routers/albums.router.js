import { 
  getAllAlbums, 
  getSpecificAlbum, 
  addAlbum, 
  updateAlbumByID, 
  deleteAlbumByID 
} from "../controllers/albums.controller.js";

import express from "express";

export const albumsRouter = express.Router();

// albums routes
albumsRouter.get("/", getAllAlbums);
albumsRouter.get("/:id", getSpecificAlbum);
albumsRouter.post("/", addAlbum);
albumsRouter.put("/:id", updateAlbumByID);
albumsRouter.delete("/:id", deleteAlbumByID);

