import {ValidationError} from "../errors/ValidationError.js";
import {validateURL} from "./artists.validation.js";
import {HTTPException} from "../errors/HTTPException.js";

/**
 * validation to make sure album requested exists
 * @param {Album[]}results first index of results from query on database
 * @throws {HTTPException} 404 if no album was found
 */
export function throwIfAlbumNotFound(results){
	if(results.length === 0){
		throw new HTTPException("Album not found.", 404);
	}
}

/**
 * function to validate album details
 * @param {AlbumCreationObject}album album details to be validated
 * @throws {ValidationError|TypeError} rethrows error from validation functions
 */
export function validateAlbum(album){
	try{
		validateAlbumName(album.name);
		validateURL(album.image);
		validateAlbumArtist(album.artist);
		validateAlbumTracks(album.tracks);
	}catch(err){
		throw err;
	}
}

/**
 * validate album name
 * @param {string} name name of album
 * @throws {TypeError} if name not a string
 * @throws {ValidationError} if name too long/too short
 */
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

/**
 * validates the artist of the album creation object
 * @param {Artist}artist
 * @throws {ValidationError} if no artist, or if wrong artist details
 */
function validateAlbumArtist(artist){
	if(!artist){
		throw new ValidationError("Album must have an artist");
	}
	else if(!artist.name || !artist.image){
		throw new ValidationError("Artist must have a name and an image");
	}
}

/**
 * validates track details of album
 * @param {Track[]} tracks array of tracks on album
 * @throws {ValidationError} if there are no tracks or if there are over 20 tracks
 */
function validateAlbumTracks(tracks){
	if(!tracks){
		throw new ValidationError("Album must have tracks");
	}
	else if(tracks.length < 1){
		throw new ValidationError("Album must have at least one track");
	}
	else if(tracks.length > 20){
		throw new ValidationError("A maximum of 20 tracks can be added with an album at once");
	}
}