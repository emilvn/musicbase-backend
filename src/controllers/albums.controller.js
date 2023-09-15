import {connection} from "../../config/database.js";
import {throwIfAlbumNotFound, validateAlbum} from "../validation/albums.validation.js";

//Handle getting all the tracks
export function getAllAlbums(req, res, next) {
    const query = "CALL GetAlbumsWithArtistsAndTracks();";
    try{
        connection.query(query, (error, results, _fields) => {
            if (error) next(error);
            else res.json(results);
        });
    }catch(err){
        next(err);
    }
}

//Handle getting a specific track 
export function getSpecificAlbum(req, res, next) {
    const id = req.params.id;
    const query = "SELECT * FROM albums WHERE id = ?;";
    const values = [id];
    connection.query(query, values, (error, results, _fields) => {
        try{
            throwIfAlbumNotFound(results);
        }catch(err){
            next(err);
        }
        if (error) next(error);
        else res.json(results[0]);
    });
}

//handle adding a track to the database
export function addAlbum(req, res, next) {
    const album = req.body;
    const query = "INSERT INTO albums(name) VALUES(?);";
    const values = [album.name];
    try{
        validateAlbum(album);
        connection.query(query, values, (error, results, _fields) => {
            if (error) next(error);
            else res.json(results);
        });
    }catch(err){
        next(err);
    }
}

//handle updating a specifik track using ID
export function updateAlbumByID(req, res, next) {
    const id = req.params.id;
    const album = req.body;
    const query = "UPDATE albums SET name = ? WHERE id = ?;";
    const values = [album.name, id];
    try{
        validateAlbum(album);
        connection.query(query, values, (error, results) => {
            if (error) next(error);
            else res.json(results);
        });
    }catch(err){
        next(err);
    }
}

//handle deleting a specific track using ID
export function deleteAlbumByID(req, res, next) {
    const id = req.params.id;
    const query = "DELETE FROM albums WHERE id =?;";
    const values = [id];
    try{
        connection.query(query, values, (error, results) => {
            if (error) next(error);
            else res.json(results);
        });
    }catch(err){
        next(err);
    }
}
