import {ValidationError} from "../errors/ValidationError.js";

export function validateSearchQuery(query){
	if(query.length > 255){
		throw new ValidationError("Search value too long.");
	}
}