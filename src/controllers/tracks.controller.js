import { connection } from "../../database.js";

//Handle getting all the tracks
export function getAllTracks(request, response) {
    const query = "SELECT * FROM tracks;";
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
}

//Handle getting a specific track 
export function getSpecificTrack(request, response) {
    const id = request.params.id;
    const query = "SELECT * FROM tracks WHERE id = ?;";
    const values = [id];
    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results[0]);
        }
    });
}

//handle adding a track to the database
export function addTrack(request, response) {
    const tracks = request.body;
    const query = "INSERT INTO tracks(track_name) VALUES(?);";
    const values = [tracks.track_name];
    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
}

//handle updating a specifik track using ID
export function updateTracksByID(request, response) {
    const id = request.params.id;
    const track = request.body;
    const query = "UPDATE tracks SET track_name = ? WHERE id = ?;";
    const values = [track.track_name, id];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
}

//handle deleting a specific track using ID
export function deleteTrackByID(request, response) {
    const id = request.params.id;
    const query = "DELETE FROM tracks WHERE id =?;";
    const values = [id];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
}