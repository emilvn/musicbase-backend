import {connection} from "../../config/database.js";

//Handle getting all the tracks
export function getAllTracks(req, res) {
    const query = "SELECT * FROM tracks;";
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
        } else {
            res.json(results);
        }
    });
}

//Handle getting a specific track 
export function getSpecificTrack(req, res) {
    const id = req.params.id;
    const query = "SELECT * FROM tracks WHERE id = ?;";
    const values = [id];
    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.json(results[0]);
        }
    });
}

//handle adding a track to the database
export function addTrack(req, res) {
    const tracks = req.body;
    const query = "INSERT INTO tracks(track_name) VALUES(?);";
    const values = [tracks.track_name];
    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.json(results);
        }
    });
}

//handle updating a specifik track using ID
export function updateTracksByID(req, res) {
    const id = req.params.id;
    const track = req.body;
    const query = "UPDATE tracks SET track_name = ? WHERE id = ?;";
    const values = [track.track_name, id];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.json(results);
        }
    });
}

//handle deleting a specific track using ID
export function deleteTrackByID(req, res) {
    const id = req.params.id;
    const query = "DELETE FROM tracks WHERE id =?;";
    const values = [id];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.json(results);
        }
    });
}