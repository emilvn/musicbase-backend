import { json } from "express";
import { connection } from "../../config/database.js";

export function getAllSearchReq(req, res){
  const query = "call search('su');"
  connection.query(query, (error, resulst, fields) => { 
    if(error){
      console.log(error);
    } else {
      res.json(resulst)
    }
  })
}