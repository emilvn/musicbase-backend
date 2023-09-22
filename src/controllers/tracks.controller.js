import {connection} from "../../config/database.js";
import {throwIfTrackNotFound, validateTrackName} from "../validation/tracks.validation.js";
// noinspection ES6UnusedImports
import express from "express";

/**
 * gets track data from the database and responds with it
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 * @returns {Promise<void>}
 */
export async function getAllTracks(req, res, next) {
    try{
        // getTracks procedure, see /database_docs/procedures/getTracks.md
        const query = "CALL getTracks();";
        const [result] = await connection.execute(query);
        res.json(result[0]);
    }catch(err){
        next(err);
    }
}

/**
 * gets specific track data from the database by id
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 * @returns {Promise<void>}
 */
export async function getSpecificTrack(req, res, next) {
    const id = req.params.id;
    const query = "SELECT * FROM tracks WHERE id = ?;";
    const values = [id];
    try{
        const [result] = await connection.execute(query, values);
        throwIfTrackNotFound(result[0]);
        res.json(result[0]);
    }catch(err){
        next(err);
    }
}

/**
 * updates track data on the database by id
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 * @returns {Promise<void>}
 */
export async function updateTracksByID(req, res, next) {
    const id = req.params.id;
    const track = req.body;
    const query = "UPDATE tracks SET name = ? WHERE id = ?;";
    const values = [track.name, id];
    try{
        validateTrackName(track);
        const [result] = await connection.execute(query, values);
        res.json(result[0]);
    }catch(err){
        next(err);
    }
}

/**
 * delete track data from the database by id
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 * @returns {Promise<void>}
 */
export async function deleteTrackByID(req, res, next) {
    const id = req.params.id;
    const query = "DELETE FROM tracks WHERE id =?;";
    const values = [id];
    try{
        const [result] = await connection.execute(query, values);
        res.json(result[0]);
    }catch(err){
        next(err);
    }
}