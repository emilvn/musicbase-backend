import {connection} from "../../config/database.js";
import {throwIfArtistNotFound, validateArtist} from "../validation/artists.validation.js";
// noinspection ES6UnusedImports
import express from "express";

/**
 * gets artist data from the database and responds with it
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 * @returns {Promise<void>}
 */
export async function getAllArtists(req, res, next) {
    // getArtists procedure, see /database_docs/procedures/getArtists.md
    const query = "CALL getArtists();";
    try{
        const [result] = await connection.execute(query);
        res.json(result[0]);
    }catch(err){
        next(err);
    }
}

/**
 * gets specific artist data from the database and responds with it
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 * @returns {Promise<void>}
 */
export async function getArtistById(req, res, next) {
    const id = req.params.id;
    const query = "SELECT * FROM artists WHERE id = ?;";
    const values = [id];
    try{
        const [result] = await connection.execute(query, values);
        throwIfArtistNotFound(result[0]);
        res.json(result[0]);
    }catch(err){
        next(err);
    }

}

/**
 * adds new artist data to the database
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 * @returns {Promise<void>}
 */
export async function createArtist(req, res, next) {
    const artist = req.body;
    // insertArtist procedure, see /database_docs/procedures/insertArtist.md
    const query = "CALL insertArtist(?,?)";
    const values = [artist.name, artist.image];
    try{
        validateArtist(artist);
        const [result] = await connection.execute(query, values);
        res.json(result[0]);
    }catch(err){
        next(err);
    }
}

/**
 * updates artist data on the database by id
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 * @returns {Promise<void>}
 */
export async function updateArtistById(req, res, next) {
    const id = req.params.id;
    const artist = req.body;
    const query = "UPDATE artists SET name = ?, image =? WHERE id = ? ";
    const values = [artist.name, artist.image, id];
    try{
        validateArtist(artist);
        const [result] = await connection.execute(query, values);
        res.json(result[0]);
    }catch(err){
        next(err);
    }
}

/**
 * deletes artist data on the database by id
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 * @returns {Promise<void>}
 */
export async function deleteArtistById(req, res, next) {
    const id = req.params.id;
    const query = "DELETE FROM artists WHERE id =?;";
    const values = [id];
    try{
        const [result] = await connection.execute(query, values);
        res.json(result[0]);
    }catch(err){
        next(err);
    }
}