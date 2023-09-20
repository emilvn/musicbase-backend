import {HTTPException} from "../errors/HTTPException.js";
import {ValidationError} from "../errors/ValidationError.js";

/**
 * validation to make sure artist requested exists
 * @param {Album[]}results first index of results from query on database
 * @throws {HTTPException} 404 if no artist was found
 */
export function throwIfArtistNotFound(results){
	if(results.length === 0){
		throw new HTTPException("Artist not found.", 404);
	}
}

/**
 * function to validate artist details
 * @param {Artist}artist artist details to be validated
 * @throws {ValidationError|TypeError} rethrows error from validation functions
 */
export function validateArtist(artist){
	try{
		validateArtistName(artist.name);
		validateURL(artist.image);
	}catch(err){
		throw err;
	}
}

/**
 * validate artist name
 * @param {string} name name of artist
 * @throws {TypeError} if artist name not a string
 * @throws {ValidationError} if artist name too long/too short
 */
function validateArtistName(name){
	if(typeof name !== "string"){
		throw new TypeError();
	}
	else if(name.length > 255){
		throw new ValidationError("Artist name too long.");
	}
	else if(name.length < 1){
		throw new ValidationError("Artist name too short");
	}
}

/**
 * validate URL, must begin with http:// or https://
 * @param {string} url url to be validated
 * @throws {TypeError} if url not a string
 * @throws {ValidationError} if url doesn't start with http:// or https://
 */
export function validateURL(url){
	if(typeof url !== "string"){
		throw new TypeError();
	}
	if(!url.match(/^https?:\/\/[^\s/$.?#].\S*$/i)){
		throw new ValidationError("Invalid URL must begin with http:// or https://");
	}
}