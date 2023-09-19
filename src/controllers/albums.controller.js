import {connection} from "../../config/database.js";
import {throwIfAlbumNotFound, validateAlbum} from "../validation/albums.validation.js";
import { prepareAlbumData } from "./helpers/prepareAlbumData.js";

//Handle getting all the tracks
export function getAllAlbums(req, res, next) {
    const query = "CALL getAlbums();";
    try{
        connection.query(query, (error, results, _fields) => {
            if (error) next(error);
            else res.json(results[0]);
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
// export function addAlbum(req, res, next) {
//     const album = req.body;
//     const query = "INSERT INTO albums(name) VALUES(?);";
//     const values = [album.name];
//     try{
//         validateAlbum(album);
//         connection.query(query, values, (error, results, _fields) => {
//             if (error) next(error);
//             else res.json(results);
//         });
//     }catch(err){
//         next(err);
//     }
// }

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

export async function createAlbum(req, res, next){
    const albumData = prepareAlbumData(req.body);
    try{
        const artistPromise = new Promise((resolve, reject) => {
            connection.query("call insertArtist(?, ?)", [albumData.artist.name, albumData.artist.image], (error, results) => {
                if (error) reject(error);
                else resolve(results[0]);
            });
        });
        const artistId = (await artistPromise)[0].id;
        console.log(artistId)
        const albumPromise = new Promise((resolve, reject) => {
            connection.query("call insertAlbum(?, ?, ?)", [albumData.album.name, albumData.album.image, artistId], (error, results) => {
                if (error) reject(error);
                else resolve(results[0]);
            });
        });

        const albumId = (await albumPromise)[0];
        connection.query("call insertTracks(?, ?)", [[albumData.tracks], albumId], (error, results) => {
            if (error) next(error);
            else res.json(results);
        });
    } catch (err) {
        next(err);
    }
}