import {connection} from "../../config/database.js";
import {throwIfAlbumNotFound, validateAlbum} from "../validation/albums.validation.js";
import { prepareAlbumData } from "./helpers/prepareAlbumData.js";
// noinspection ES6UnusedImports
import express from "express";

/**
 * gets album data from the database and responds with it
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 */
export function getAllAlbums(req, res, next) {
    // getAlbums procedure, see /database_docs/procedures/getAlbums.md
    const query = "CALL getAlbums();";
    try{
        connection.query(query, (error, results, _fields) => {
            if (error) next(error);
            else res.json(results[0]);
        });
    }catch(err){
        next(err);
    }
}

/**
 * gets data of specific album from the database and responds with it
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 */
export function getSpecificAlbum(req, res, next) {
    const id = req.params.id;
    // getSpecificAlbum procedure, see /database_docs/procedures/getSpecificAlbum.md
    const query = "CALL getSpecificAlbum(?)";
    const values = [Number(id)];
    connection.query(query, values, (error, results, _fields) => {
        try{
            throwIfAlbumNotFound(results[0]);
        }catch(err){
            next(err);
        }
        if (error) next(error);
        else res.json(results[0]);
    });
}

/**
 * adds album data including tracks to the database
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 */
export async function createAlbum(req, res, next){
    const albumData = prepareAlbumData(req.body);
    try{
        const artistPromise = new Promise((resolve, reject) => {
            connection.query("call insertArtist(?, ?)", [albumData.artist.name, albumData.artist.image], (error, results) => {
                if (error) reject(error);
                else resolve(results[0]);
            });
        });
        const artistId = (await artistPromise)[0].id;
        const albumPromise = new Promise((resolve, reject) => {
            connection.query("call insertAlbum(?, ?, ?)", [albumData.album.name, albumData.album.image, artistId], (error, results) => {
                if (error) reject(error);
                else resolve(results[0]);
            });
        });
        const albumId = (await albumPromise)[0].id;
        connection.query("call insertTracks(?, ?)", [JSON.stringify(albumData.tracks), albumId], (error, results) => {
            if (error) next(error);
            else res.json(results);
        });
    } catch (err) {
        next(err);
    }
}

/**
 * updates album data for a specific album on the database
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 */
export function updateAlbumByID(req, res, next) {
    const id = req.params.id;
    const album = req.body;
    const query = "UPDATE albums SET name = ? WHERE id = ?;";
    const values = [album.name, id];
    try{
        validateAlbum(album);
        connection.query(query, values, (error, results) => {
            if (error) next(error);
            else res.json(results);
        });
    }catch(err){
        next(err);
    }
}

/**
 * deletes album data on the database by id
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 */
export function deleteAlbumByID(req, res, next) {
    const id = req.params.id;
    const query = "DELETE FROM albums WHERE id =?;";
    const values = [id];
    try{
        connection.query(query, values, (error, results) => {
            if (error) next(error);
            else res.json(results);
        });
    }catch(err){
        next(err);
    }
}