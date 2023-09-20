import {HTTPException} from "../errors/HTTPException.js";
import {ValidationError} from "../errors/ValidationError.js";

/**
 * validate name of track
 * @param {Track}track track to be validated
 * @throws {ValidationError} if track name too short/too long
 */
export function validateTrackName(track){
	if(track.name.length > 255){
		throw new ValidationError("Track name too long.");
	}
	else if(track.name.length < 1){
		throw new ValidationError("Track name too short.");
	}
}

/**
 * validate that track exists
 * @param {Track[]}results first index of result from query
 * @throws {HTTPException} if track not found
 */
export function throwIfTrackNotFound(results){
	if(results.length === 0){
		throw new HTTPException("Track not found.", 404);
	}
}