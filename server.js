import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

app.use(morgan("tiny"));

//app.use("/tracks/", tracksRouter);

//app.use("/artists/", artistsRouter);

//app.use("/albums/", albumsRouter);


app.listen(port,() => {
	console.log(`Server is running at http://localhost:${port}`);
});