import {ValidationError} from "../errors/ValidationError.js";

/**
 * validate length of search query
 * @param {string}query search query to be validated
 * @throws {ValidationError} if search query too long
 */
export function validateSearchQuery(query){
	if(query.length > 255){
		throw new ValidationError("Search value too long.");
	}
}