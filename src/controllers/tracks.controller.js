import { connection } from "../../database.js";

// export function getAllTracks(req, res, _next){
//     connection.query(
//         "SELECT * FROM tracks",
//         (err, results, _fields) => {
//             if(err) throw err;
//             res.json(results);
//         }
//     );
// };

// export function getSpecificTrack(req, res, _next){
//   const id = Number(req.params.id);

//   connection.query(
//     "SELECT * FROM tracks WHERE id = ?", [id],
//     (err, result, _fields) => {
//       if(err) throw err;
//       res.json(result)
//     }
//   )
// };

// export function addTrack(req, res, _next){
//   const newTrack = req.body;

//   connection.query(
//     "INSERT INTO tracks (id, track_name) VALUES (?, ?);"
//     [newTrack.id, newTrack.track_name],
//     (err, resulst, _fields) => {
//       if(err) throw err;
//       res.json(resulst)
//     }

//   )
// };

// export function updateTracksByID (req, res, _next){
//   const id = Number(req.params.id);
//   const updateTrack = req.body;

//   connection.query(
//     "UPDATE tracks SET track_name = ?, WHERE id = ?",
//     [updateTrack.track_name, id],
//     (err, result, _fields) => {
//       if(err)throw err;
//       res.json();
//     }
//   );
// };

// export function deleteTrackByID(req, res, _next){
//     const id = Number(req.params.id);
//     connection.query(
//         "DELETE FROM tracks WHERE id = ?",
//         [id],
//         (err, result, _fields) => {
//             if(err) throw err;
//             res.json(result);
//         }
//     );
// };


export function getAllTracks(request, response) {
    const query = "SELECT * FROM tracks;";
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
}

export function getSpecificTrack(request, response) {
    const id = request.params.id;
    const query = "SELECT * FROM tracks WHERE id = ?;";
    const values = [id];
    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results[0]);
        }
    });
}

export function addTrack(request, response) {
    const tracks = request.body;
    const query = "INSERT INTO tracks(track_name) VALUES(?);";
    const values = [tracks.track_name];
    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
}

export function updateTracksByID(request, response) {
    const id = request.params.id;
    const track = request.body;
    const query = "UPDATE tracks SET track_name = ? WHERE id = ?;";
    const values = [track.track_name, id];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
}


export function deleteTrackByID(request, response) {
    const id = request.params.id;
    const query = "DELETE FROM tracks WHERE id =?;";
    const values = [id];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
}