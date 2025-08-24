const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require('uuid');

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "deltaApp",
    password: "kiit",
});

// let getRandomUser = () => {
//     return [
//         faker.string.uuid(),
//         faker.internet.username(), // before version 9.1.0, use userName()
//         faker.internet.email(),
//         faker.internet.password(),
//     ];
// };

app.get("/", (req, res) => {
    let q = "select count(*) from user";
    try {
        connection.query(q, (err, results1) => {
            if (err) throw err;
            console.log(results1);
            let count = results1[0]["count(*)"];
            res.render("home.ejs", { count });
        });
    } catch (err) {
        console.log(err);
    }
});

app.get("/users", (req, res) => {
    let q = "select id, username, email from user";
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            res.render("user.ejs", { users: results });
        });
    } catch (err) {
        console.log(err);
    }
});

app.get("/users/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = "SELECT * FROM `user` WHERE id = ?";
    // res.render("edit.ejs");
    console.log(id);
    try {
        connection.query(q, [id], (err, results) => {
            if (err) throw err;
            res.render("edit.ejs", { user: results[0] });
        });
    } catch (err) {
        console.log(err);
    }
});

app.patch("/users/:id", (req, res) => {
    let { id } = req.params;
    let { password: formPass, username: newUsername } = req.body;
    let q = `select * from user where id='${id}'`;
    console.log(id);
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            let user = results[0];
            if (formPass != user.password) res.send("Wrong Password");
            else {
                let q2 = "UPDATE `user` SET username=? WHERE id=?";
                connection.query(q2, [newUsername, id], (err, results) => {
                    if (err) throw err;
                    res.redirect("/users");
                });
            }
        });
    } catch (err) {
        console.log(err);
    }
});

app.get("/users/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/users", (req, res) => {
    let { email: newEmail, username: newUsername, password: newPassword } = req.body;
    let newId = uuidv4();
    let q = `INSERT INTO user (id,username,email,password) VALUES ("${newId}","${newUsername}","${newEmail}","${newPassword}")`;
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            res.redirect("/users");
        });
    } catch (err) {
        console.log(err);
    }
});

app.get("/users/:id/delete", (req, res) => {
    let { id } = req.params;
    res.render("delete.ejs", { id });
})

app.delete("/users/:id", (req, res) => {
    let { id } = req.params;
    let { password: formPass } = req.body;
    let q = `select * from user where id='${id}'`;
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            let user = results[0];
            if (formPass != user.password) res.send("Wrong Password");
            else {
                let q2 = `DELETE FROM user WHERE id="${id}"`;
                connection.query(q2, (err, results) => {
                    if (err) throw err;
                    res.redirect("/users");
                });
            }
        });
    } catch (err) {
        console.log(err);
    }
});


app.listen("8080", () => {
    console.log("Server is listening to port 8080");
});

// let q = "INSERT INTO user (id, username, email, password) VALUES ?";

// let data = [];

// for (let i = 0; i < 100; i++)
//     data.push(getRandomUser());

// try {
//     connection.query(q, [data], (err, results) => {
//         if (err) throw err;
//         console.log(results);
//     }
//     );
// } catch (err) {
//     console.log(err);
// };
// connection.end();