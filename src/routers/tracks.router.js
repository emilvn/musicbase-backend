import { 
  getAllTracks, 
  getSpecificTrack,
  updateTracksByID, 
  deleteTrackByID 
} from "../controllers/tracks.controller.js";

import express from "express";

export const tracksRouter = express.Router();

// tracks routes
tracksRouter.get("/", getAllTracks);
tracksRouter.get("/:id", getSpecificTrack);
tracksRouter.put("/:id", updateTracksByID);
tracksRouter.delete("/:id", deleteTrackByID);

