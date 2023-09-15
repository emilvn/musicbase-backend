import {connection} from "../../config/database.js";

export function getAllArtists(request, response) {
    const query = "SELECT * FROM artists;";
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
}

export function getArtistById(request, response) {
    const id = request.params.id;
    const query = "SELECT * FROM artists WHERE id = ?;";
    const values = [id];
    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results[0]);
        }
    });
}

export function createArtist(request, response) {
    const artist = request.body;
    const query = "INSERT INTO artists(name, image) VALUES(?,?);";
    const values = [artist.name, artist.image];
    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
}

export function updateArtistById(request, response) {
    const id = request.params.id;
    const artist = request.body;
    const query = "UPDATE artists SET name = ?, image =? WHERE id = ? ";
    const values = [artist.name, artist.image, id];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
}

export function deleteArtistById(request, response) {
    const id = request.params.id;
    const query = "DELETE FROM artists WHERE id =?;";
    const values = [id];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
}
