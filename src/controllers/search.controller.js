import { connection } from "../../config/database.js";

export function getAllSearchReq(req, res){
  const query = "call search(?);"
  const value = req.query.q
  connection.query(query, [value], (error, resulst, fields) => { 
    if(error){
      console.log(error);
    } else {
      res.json(resulst)
    }
  })
}