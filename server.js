import express from "express";
import morgan from "morgan";
import cors from "cors";
import { tracksRouter } from "./src/routers/tracks.router.js";
import { artistsRouter } from "./src/routers/artists.router.js";
import {errorHandler} from "./src/middleware/errorhandler.js";
import { searchRouter } from "./src/routers/search.router.js";
import {albumsRouter} from "./src/routers/albums.router.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// morgan for logging requests in server console
app.use(morgan("tiny"));

app.get("/", (req, res) => {
	res.send("Welcome to the backend of Musicbase!");
})

app.use("/albums", albumsRouter);
app.use("/tracks", tracksRouter);
app.use("/artists", artistsRouter);
app.use("/search", searchRouter);

app.use(errorHandler);

app.listen(port,() => {
	console.log(`Server is running at http://localhost:${port}`);
});