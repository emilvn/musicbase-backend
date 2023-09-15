import { connection } from "../../config/database.js";
import {validateSearchQuery} from "../validation/search.validation.js";

export function getAllSearchReq(req, res, next){
	const query = "call search(?);"
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