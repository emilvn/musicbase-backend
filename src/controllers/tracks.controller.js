import {connection} from "../../config/database.js";
import {throwIfTrackNotFound, validateTrackName} from "../validation/tracks.validation.js";

//Handle getting all the tracks
export function getAllTracks(req, res, next) {
    try{
        const query = "SELECT * FROM tracks;";
        connection.query(query, (error, results, _fields) => {
            if (error) throw error;
            res.json(results);
        });
    }catch(err){
        next(err); // forward error to error handler middleware
    }
}

//Handle getting a specific track 
export function getSpecificTrack(req, res, next) {
    const id = req.params.id;
    const query = "SELECT * FROM tracks WHERE id = ?;";
    const values = [id];
    try{
        connection.query(query, values, (error, results, _fields) => {
            if (error) throw error;
            throwIfTrackNotFound(results);
            res.json(results[0]);
        });
    }catch(err){
        next(err); // forward error to error handler middleware
    }
}

//handle adding a track to the database
export function addTrack(req, res, next) {
    const track = req.body;
    const query = "INSERT INTO tracks(name) VALUES(?);";
    const values = [track.name];
    try{
        validateTrackName(track.name); // throws if name too long/short
        connection.query(query, values, (error, results) => {
            if (error) throw error;
            res.status(201).json(results);
        });
    }catch(err){
        next(err); // forward error to error handler middleware
    }
}

//handle updating a specifik track using ID
export function updateTracksByID(req, res, next) {
    const id = req.params.id;
    const track = req.body;
    const query = "UPDATE tracks SET track_name = ? WHERE id = ?;";
    const values = [track.name, id];
    try{
        validateTrackName(track.name); // throws if name too long/short
        connection.query(query, values, (error, results, _fields) => {
            if (error) throw error;
            res.json(results);
        });
    }catch(err){
        next(err); // forward error to error handler middleware
    }
}

//handle deleting a specific track using ID
export function deleteTrackByID(req, res, next) {
    const id = req.params.id;
    const query = "DELETE FROM tracks WHERE id =?;";
    const values = [id];
    try{
        connection.query(query, values, (error, results, _fields) => {
            if (error) throw error;
            res.json(results);
        });
    }catch(err){
        next(err); // forward error to error handler middleware
    }
}