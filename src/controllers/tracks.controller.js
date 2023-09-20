import {connection} from "../../config/database.js";
import {throwIfTrackNotFound, validateTrackName} from "../validation/tracks.validation.js";
// noinspection ES6UnusedImports
import express from "express";

/**
 * gets track data from the database and responds with it
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 */
export function getAllTracks(req, res, next) {
    try{
        // getTracks procedure, see /database_docs/procedures/getTracks.md
        const query = "CALL getTracks();";
        connection.query(query, (error, results, _fields) => {
            if (error) next(error);
            res.json(results[0]);
        });
    }catch(err){
        next(err); // forward error to error handler middleware
    }
}

/**
 * gets specific track data from the database by id
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 */
export function getSpecificTrack(req, res, next) {
    const id = req.params.id;
    const query = "SELECT * FROM tracks WHERE id = ?;";
    const values = [id];
    try{
        connection.query(query, values, (error, results, _fields) => {
            try{
                throwIfTrackNotFound(results);
            }catch(err){
                next(err);
            }
            if (error) next(error);
            else res.json(results[0]);
        });
    }catch(err){
        next(err);
    }
}

/**
 * updates track data on the database by id
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 */
export function updateTracksByID(req, res, next) {
    const id = req.params.id;
    const track = req.body;
    const query = "UPDATE tracks SET name = ? WHERE id = ?;";
    const values = [track.name, id];
    try{
        validateTrackName(track); // throws if name too long/short
        connection.query(query, values, (error, results, _fields) => {
            if (error) next(error);
            else res.json(results);
        });
    }catch(err){
        next(err); // forward error to error handler middleware
    }
}

/**
 * delete track data from the database by id
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 */
export function deleteTrackByID(req, res, next) {
    const id = req.params.id;
    const query = "DELETE FROM tracks WHERE id =?;";
    const values = [id];
    try{
        connection.query(query, values, (error, results, _fields) => {
            if (error) next(error);
            res.json(results);
        });
    }catch(err){
        next(err); // forward error to error handler middleware
    }
}