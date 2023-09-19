import { 
  getAllAlbums, 
  getSpecificAlbum, 
  updateAlbumByID, 
  deleteAlbumByID,
  createAlbum
} from "../controllers/albums.controller.js";

import express from "express";

export const albumsRouter = express.Router();

//handle the routing
albumsRouter.get("/", getAllAlbums)
albumsRouter.get("/:id", getSpecificAlbum)
albumsRouter.post("/", createAlbum)
albumsRouter.put("/:id", updateAlbumByID)
albumsRouter.delete("/:id", deleteAlbumByID)
albumsRouter.delete("/:id", deleteAlbumByID)


