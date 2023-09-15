import {HTTPException} from "../errors/HTTPException.js";
import {ValidationError} from "../errors/ValidationError.js";

export function throwIfArtistNotFound(results){
	if(results.length === 0){
		throw new HTTPException("Artist not found.", 404);
	}
}

export function validateArtist(artist){
	try{
		validateArtistName(artist.name);
		validateURL(artist.image);
	}catch(err){
		throw err;
	}
}

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
export function validateURL(url){
	if(typeof url !== "string"){
		throw new TypeError();
	}
	if(!url.match(/^https?:\/\/[^\s/$.?#].\S*$/i)){
		throw new ValidationError("Invalid URL must begin with http:// or https://");
	}
}