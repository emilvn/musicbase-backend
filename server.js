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

//welcome route
app.get("/", (req, res) => {
	res.send("Hej, det virker");
})

// albums router
app.use("/albums/", albumsRouter);

// tracks router
app.use("/tracks/", tracksRouter);

// artists router
app.use("/artists/", artistsRouter);

// search router
app.use("/search/", searchRouter);

// error handler middleware, use next(error) to pass error to errorhandler
app.use(errorHandler);

// start server
app.listen(port,() => {
	console.log(`Server is running at http://localhost:${port}`);
});