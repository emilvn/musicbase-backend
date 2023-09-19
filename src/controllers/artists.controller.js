import {connection} from "../../config/database.js";
import {throwIfArtistNotFound, validateArtist} from "../validation/artists.validation.js";
// noinspection ES6UnusedImports
import express from "express";

/**
 * gets artist data from the database and responds with it
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 */
export function getAllArtists(req, res, next) {
    // getArtists procedure, see /database_docs/procedures/getArtists.md
    const query = "CALL getArtists();";
    try{
        connection.query(query, (error, results, _fields) => {
            if (error) next(error);
            else res.json(results[0]);
        });
    }catch(err){
        next(err);// forward error to error handler middleware
    }
}

/**
 * gets specific artist data from the database and responds with it
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 */
export function getArtistById(req, res, next) {
    const id = req.params.id;
    const query = "SELECT * FROM artists WHERE id = ?;";
    const values = [id];
    try{
        connection.query(query, values, (error, results, _fields) => {
            try{
                throwIfArtistNotFound(results)
            }catch(err){
                next(err);
            }
            if (error) next(error);
            else res.json(results[0]);
        });
    }catch(err){
        next(err);// forward error to error handler middleware
    }

}

/**
 * adds new artist data to the database
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 */
export function createArtist(req, res, next) {
    const artist = req.body;
    const query = "INSERT INTO artists(name, image) VALUES(?,?);";
    const values = [artist.name, artist.image];
    try{
        validateArtist(artist); // throws if artist details are invalid
        connection.query(query, values, (error, results, _fields) => {
            if (error) next(error);
            else res.json(results);
        });
    }catch(err){
        next(err);// forward error to error handler middleware
    }
}

/**
 * updates artist data on the database by id
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 */
export function updateArtistById(req, res, next) {
    const id = req.params.id;
    const artist = req.body;
    const query = "UPDATE artists SET name = ?, image =? WHERE id = ? ";
    const values = [artist.name, artist.image, id];
    try{
        validateArtist(artist); // throws if artist details are invalid
        connection.query(query, values, (error, results, _fields) => {
            if (error) next(error);
            else res.json(results);
        });
    }catch(err){
        next(err);// forward error to error handler middleware
    }
}

/**
 * deletes artist data on the database by id
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 */
export function deleteArtistById(req, res, next) {
    const id = req.params.id;
    const query = "DELETE FROM artists WHERE id =?;";
    const values = [id];
    try{
        connection.query(query, values, (error, results) => {
            if (error) next(error);
            else res.json(results);
        });
    }catch(err){
        next(err);// forward error to error handler middleware
    }
}