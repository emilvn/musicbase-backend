import { connection } from "../../config/database.js";
import {validateSearchQuery} from "../validation/search.validation.js";

export function searchArtists(req, res, next){
	const query = "CALL searchArtists(?);"
	const value = req.query.q
	try{
  		validateSearchQuery(value);
  		connection.query(query, [value], (error, results, _fields) => {
			if(error) next(error);
			else res.json(results[0]);
	  	});
	}catch(err){
		next(err);
	}
}
export function searchAlbums(req, res, next){
	const query = "CALL searchAlbums(?);"
	const value = req.query.q
	try{
  		validateSearchQuery(value);
  		connection.query(query, [value], (error, results, _fields) => {
			if(error) next(error);
			else res.json(results[0]);
	  	});
	}catch(err){
		next(err);
	}
}
export function searchTracks(req, res, next){
	const query = "CALL searchTracks(?);"
	const value = req.query.q
	try{
  		validateSearchQuery(value);
  		connection.query(query, [value], (error, results, _fields) => {
			if(error) next(error);
			else res.json(results[0]);
	  	});
	}catch(err){
		next(err);
	}
}