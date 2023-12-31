import {connection} from "../../config/database.js";
import {throwIfAlbumNotFound, validateAlbum} from "../validation/albums.validation.js";
import { prepareAlbumData } from "./helpers/prepareAlbumData.js";
// noinspection ES6UnusedImports
import express from "express";

/**
 * gets complete album data, including complete data for all artists and tracks relating to the album
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 * @returns {Promise<void>}
 */
export async function getAllAlbumsComplete(req, res, next){
    const query = "CALL GetAlbumsWithArtistsAndTracks();";
    try{
        const [result] = await connection.execute(query);
        res.json(result[0]);
    }catch(err){
        next(err);
    }
}

/**
 * gets album data from the database and responds with it
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 * @returns {Promise<void>}
 */
export async function getAllAlbums(req, res, next) {
    // getAlbums procedure, see /database_docs/procedures/getAlbums.md
    const query = "CALL getAlbums();";
    try{
        const [result] = await connection.execute(query);
        res.json(result[0]);
    }catch(err){
        next(err);
    }
}

/**
 * gets data of specific album from the database and responds with it
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 * @returns {Promise<void>}
 */
export async function getSpecificAlbum(req, res, next) {
    const id = req.params.id;
    // getSpecificAlbum procedure, see /database_docs/procedures/getSpecificAlbum.md
    const query = "CALL getSpecificAlbum(?)";
    const values = [Number(id)];
    try{
        const [result] = await connection.execute(query, values);
        throwIfAlbumNotFound(result[0]);
        res.json(result[0]);
    }
    catch(err){
        next(err);
    }
}

/**
 * adds album data including tracks to the database
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 * @returns {Promise<void>}
 */
export async function createAlbum(req, res, next){
    const albumData = prepareAlbumData(req.body);
    try{
        const [artistResult] = await connection.execute("call insertArtist(?, ?)", [albumData.artist.name, albumData.artist.image]);
        const artistId = artistResult[0][0].id;
        const [albumResult] = await connection.execute("call insertAlbum(?, ?, ?)", [albumData.album.name, albumData.album.image, artistId]);
        const albumId = albumResult[0][0].id;
        const [result] = await connection.execute("call insertTracks(?, ?)", [JSON.stringify(albumData.tracks), albumId]);
        res.json(result[0]);
    } catch (err) {
        next(err);
    }
}

/**
 * updates album data for a specific album on the database
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 * @returns {Promise<void>}
 */
export async function updateAlbumByID(req, res, next) {
    const id = req.params.id;
    const album = req.body;
    const query = "UPDATE albums SET name = ? WHERE id = ?;";
    const values = [album.name, id];
    try{
        validateAlbum(album);
        const [result] = await connection.execute(query, values);
        res.json(result[0]);
    }catch(err){
        next(err);
    }
}

/**
 * deletes album data on the database by id
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 * @returns {Promise<void>}
 */
export async function deleteAlbumByID(req, res, next) {
    const id = req.params.id;
    const query = "DELETE FROM albums WHERE id =?;";
    const values = [id];
    try{
        const [result] = await connection.execute(query, values);
        res.json(result[0]);
    }catch(err){
        next(err);
    }
}