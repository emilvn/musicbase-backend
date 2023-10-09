import {
  getAllAlbums,
  getSpecificAlbum,
  updateAlbumByID,
  deleteAlbumByID,
  createAlbum, getAllAlbumsComplete
} from "../controllers/albums.controller.js";

import express from "express";

export const albumsRouter = express.Router();

albumsRouter.get("/", getAllAlbumsComplete);
albumsRouter.get("/:id", getSpecificAlbum);
albumsRouter.post("/", createAlbum);
albumsRouter.put("/:id", updateAlbumByID);
albumsRouter.delete("/:id", deleteAlbumByID);