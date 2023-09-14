function getAllTracks(req, res, _next){
    connection.query(
        "SELECT * FROM tracks",
        (err, results, _fields) => {
            if(err) throw err;
            res.json(results);
        }
    );
}

// app.get("/users/:id", getOne);
// function getOne(req, res, _next){
//     const id = Number(req.params.id);
//     connection.query(
//         "SELECT * FROM users WHERE id = ?", [id],
//         (err, result, _fields)=>{
//             if(err) throw err;
//             res.json(result);
//         }
//     );
// }

// app.post("/users", insertUser);

// function insertUser(req, res, _next){
//     const newUser = req.body;
//     connection.query(
//         "INSERT INTO users (track_name, image, mail, title) VALUES (?,?,?,?);",
//         [newUser.name, newUser.image, newUser.mail, newUser.title],
//         (err, result, _fields) => {
//             if(err) throw err;
//             res.json(result);
//         }
//     );
// }

// function updateUser(req, res, _next){
//     const id = Number(req.params.id);
//     const updatedUser = req.body;

//     connection.query(
//         "UPDATE users SET name = ?, image = ?, mail = ?, title = ? WHERE id = ?",
//         [updatedUser.name, updatedUser.image, updatedUser.mail, updatedUser.title, id],
//         (err, result, _fields) => {
//             if (err) throw err;
//             res.json();
//         }
//     );
// }

// app.delete("/users/:id", deleteUser);

// function deleteUser(req, res, _next){
//     const id = Number(req.params.id);
//     connection.query(
//         "DELETE FROM users WHERE id = ?",
//         [id],
//         (err, result, _fields) => {
//             if(err) throw err;
//             res.json(result);
//         }
//     );
// }
