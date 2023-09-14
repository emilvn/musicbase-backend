import mysql from "mysql2"
import cors from "cors"
import express from "express"


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "musicbase_db",
    password: "mart0808",
    multipleStatements: true,
});




app.get("/users/:id", (request, response) => {
    const id = request.params.id;
    const query = "SELECT * FROM users WHERE id = ?;";
    const values = [id];
    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results[0]);
        }
    });
});

app.post("/users", (request, response) => {
    const user = request.body;
    const query = "INSERT INTO users(name, mail, title, image) VALUES(?,?,?,?);";
    const values = [user.name, user.mail, user.title, user.image];
    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
});

app.put("/users/:id", (request, response) => {
    const id = request.params.id;
    const user = request.body;
    const query = "UPDATE users SET name = ?, title = ?, mail = ?, image =? WHERE id = ? ";
    const values = [user.name, user.mail, user.title, user.image, id];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
});

app.delete("/users/:id", (request, response) => {
    const id = request.params.id;
    const query = "DELETE FROM users WHERE id =?;";
    const values = [id];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
});