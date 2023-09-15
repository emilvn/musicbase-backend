import {ValidationError} from "../errors/ValidationError.js";
import {validateURL} from "./artists.validation.js";
import {HTTPException} from "../errors/HTTPException.js";


export function throwIfAlbumNotFound(results){
	if(results.length === 0){
		throw new HTTPException("Album not found.", 404);
	}
}
export function validateAlbum(album){
	try{
		validateAlbumName(album.name);
		validateURL(album.image);
	}catch(err){
		throw err;
	}
}

function validateAlbumName(name){
	if(typeof name !== "string"){
		throw new TypeError();
	}
	else if(name.length > 255){
		throw new ValidationError("Album name too long.");
	}
	else if(name.length < 1){
		throw new ValidationError("Album name too short");
	}
}