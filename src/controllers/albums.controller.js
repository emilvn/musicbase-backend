import {connection} from "../../config/database.js";

//Handle getting all the tracks
export function getAllAlbums(req, res) {
    const query = "SELECT * FROM albums;";
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
        } else {
            res.json(results);
        }
    });
}

//Handle getting a specific track 
export function getSpecificAlbum(req, res) {
    const id = req.params.id;
    const query = "SELECT * FROM albums WHERE id = ?;";
    const values = [id];
    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.json(results[0]);
        }
    });
}

//handle adding a track to the database
export function addAlbum(req, res) {
    const album = req.body;
    const query = "INSERT INTO albums(name) VALUES(?);";
    const values = [album.name];
    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.json(results);
        }
    });
}

//handle updating a specifik track using ID
export function updateAlbumByID(req, res) {
    const id = req.params.id;
    const album = req.body;
    const query = "UPDATE albums SET name = ? WHERE id = ?;";
    const values = [album.name, id];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.json(results);
        }
    });
}

//handle deleting a specific track using ID
export function deleteAlbumByID(req, res) {
    const id = req.params.id;
    const query = "DELETE FROM albums WHERE id =?;";
    const values = [id];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.json(results);
        }
    });
}