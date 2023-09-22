import { connection } from "../../config/database.js";
import {validateSearchQuery} from "../validation/search.validation.js";
// noinspection ES6UnusedImports
import express from "express";

/**
 * finds artists on the database matching the search query and sends results to the client
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 * @returns {Promise<void>}
 */
export async function searchArtists(req, res, next){
	// searchArtists procedure, see /database_docs/procedures/searchArtists.md
	const query = "CALL searchArtists(?);"
	const value = req.query.q
	try{
		validateSearchQuery(value);
		const [result] = await connection.execute(query, [value]);
		res.json(result[0]);
	}catch(err){
		next(err);
	}
}

/**
 * finds albums on the database matching the search query and sends the results to the client
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 * @returns {Promise<void>}
 */
export async function searchAlbums(req, res, next){
	// searchAlbums procedure, see /database_docs/procedures/searchAlbums.md
	const query = "CALL searchAlbums(?);"
	const value = req.query.q
	try{
		validateSearchQuery(value);
		const [result] = await connection.execute(query, [value]);
		res.json(result[0]);
	}catch(err){
		next(err);
	}
}

/**
 * finds tracks on the database matching the search query and sends the results to the client
 * @param {express.Request} req incoming request object
 * @param {express.Response} res outgoing response, for sending response to client
 * @param {express.NextFunction} next callback function to pass control to next middleware
 * @returns {Promise<void>}
 */
export async function searchTracks(req, res, next){
	// searchTracks procedure, see /database_docs/procedures/searchTracks.md
	const query = "CALL searchTracks(?);"
	const value = req.query.q
	try{
		validateSearchQuery(value);
		const [result] = await connection.execute(query, [value]);
		res.json(result[0]);
	}catch(err){
		next(err);
	}
}