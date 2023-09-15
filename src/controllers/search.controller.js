import { json } from "express";
import { connection } from "../../config/database.js";

export function getAllSearchReq(req, res){
  const query = "call search('summer');"
  connection.query(query, (error, resulst, fields) => { 
    if(error){
      console.log(error);
    } else {
      console.log(json(resulst))
      res.json(resulst)
    }
  })
}