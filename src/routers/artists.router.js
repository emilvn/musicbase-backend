import { getAllArtists, getArtistById, createArtist, updateArtistById, deleteArtistById } from "../controllers/artists.controller.js";
import express from "express"

export const artistsRouter = express.Router();

// artists routes
artistsRouter.get("/", getAllArtists);
artistsRouter.get("/:id", getArtistById);
artistsRouter.post("/", createArtist);
artistsRouter.put("/:id", updateArtistById);
artistsRouter.delete("/:id", deleteArtistById);




