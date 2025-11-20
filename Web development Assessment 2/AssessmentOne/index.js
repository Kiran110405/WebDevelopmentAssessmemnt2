const express = require("express"); //declares content of express module of express folder available in this file
const app = express(); //executes the function
const path = require("path");

const userModel = require("./models/users");

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Listening on port 3000"); //outputs to the console to show that its working
});

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.get("/map", (request, response) => {
  response.sendFile(path.join(__dirname, "/views", "map.html"));
});

app.get("/register", (request, response) => {
  response.sendFile(path.join(__dirname, "/views", "register.html"));
});

app.get("/notes", (request, response) => {
  response.sendFile(path.join(__dirname, "/views", "notes.html"));
});

app.get("/login", (request, response) => {
  response.sendFile(path.join(__dirname, "/views", "login.html"));
});
