import {connection} from "../../config/database.js";
import {throwIfArtistNotFound, validateArtist} from "../validation/artists.validation.js";

export function getAllArtists(req, res, next) {
    const query = "SELECT * FROM artists;";
    try{
        connection.query(query, (error, results, _fields) => {
            if (error) next(error);
            else res.json(results);
        });
    }catch(err){
        next(err);// forward error to error handler middleware
    }
}

export function getArtistById(req, res, next) {
    const id = req.params.id;
    const query = "SELECT * FROM artists WHERE id = ?;";
    const values = [id];
    try{
        connection.query(query, values, (error, results, _fields) => {
            try{
                throwIfArtistNotFound(results)
            }catch(err){
                next(err);
            }
            if (error) next(error);
            else res.json(results[0]);
        });
    }catch(err){
        next(err);// forward error to error handler middleware
    }

}

export function createArtist(req, res, next) {
    const artist = req.body;
    const query = "INSERT INTO artists(name, image) VALUES(?,?);";
    const values = [artist.name, artist.image];
    try{
        validateArtist(artist); // throws if artist details are invalid
        connection.query(query, values, (error, results, _fields) => {
            if (error) next(error);
            else res.json(results);
        });
    }catch(err){
        next(err);// forward error to error handler middleware
    }
}

export function updateArtistById(req, res, next) {
    const id = req.params.id;
    const artist = req.body;
    const query = "UPDATE artists SET name = ?, image =? WHERE id = ? ";
    const values = [artist.name, artist.image, id];
    try{
        validateArtist(artist); // throws if artist details are invalid
        connection.query(query, values, (error, results, _fields) => {
            if (error) next(error);
            else res.json(results);
        });
    }catch(err){
        next(err);// forward error to error handler middleware
    }
}

export function deleteArtistById(req, res, next) {
    const id = req.params.id;
    const query = "DELETE FROM artists WHERE id =?;";
    const values = [id];
    try{
        connection.query(query, values, (error, results) => {
            if (error) next(error);
            else res.json(results);
        });
    }catch(err){
        next(err);// forward error to error handler middleware
    }
}