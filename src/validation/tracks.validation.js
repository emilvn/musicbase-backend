import {HTTPException} from "../errors/HTTPException.js";
import {ValidationError} from "../errors/ValidationError.js";

export function validateTrackName(track){
	if(track.name.length > 255){
		throw new ValidationError("Track name too long.");
	}
	else if(track.name.length < 1){
		throw new ValidationError("Track name too short.");
	}
}

export function throwIfTrackNotFound(results){
	if(results.length === 0){
		throw new HTTPException("Track not found.", 404);
	}
}