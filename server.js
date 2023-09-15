import express from "express";
import morgan from "morgan";
import cors from "cors";
import {errorHandler} from "./src/middleware/errorhandler.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

app.use(morgan("tiny"));

//app.use("/tracks/", tracksRouter);

//app.use("/artists/", artistsRouter);

//app.use("/albums/", albumsRouter);
app.use(errorHandler);
app.listen(port,() => {
	console.log(`Server is running at http://localhost:${port}`);
});