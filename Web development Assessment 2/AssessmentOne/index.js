const express = require("express"); //declares content of express module of express folder available in this file
const app = express(); //executes the function
const path = require("path");

const users = require("./models/users");

const userModel = require("./models/users");

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Listening on port 3000"); //outputs to the console to show that its working
});

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

const mongoose = require("mongoose");

const dotenv = require("dotenv").config();
const mongoDBPassword = process.env.MONGODB_PASSWORD;
const mongoDBUsername = process.env.MONGODB_USERNAME;
const mongoDBAppName = process.env.MONGODB_MYAPPNAME;
//gets mongo information from .env file

const connectionString = `mongodb+srv://${mongoDBUsername}:${mongoDBPassword}@cluster0.lpfnqqx.mongodb.net/${mongoDBAppName}?retryWrites=true&w=majority`;
mongoose.connect(connectionString);

app.get("/map", (request, response) => {
  response.sendFile(path.join(__dirname, "/public", "map.html"));
});

app.get("/register", (request, response) => {
  response.sendFile(path.join(__dirname, "/public", "register.html"));
});

app.post("/register", (request, response) => {
  if (users.addUser(request.body.username, request.body.password)) {
    return response.sendFile(path.join(__dirname, "/public", "login.html"));
  }
  response.sendFile(
    path.join(__dirname, "/public", "registration_failed.html")
  );
});

app.get("/login", (request, response) => {
  response.sendFile(path.join(__dirname, "/public", "login.html"));
});

app.post("/login", (request, response) => {
  if (users.checkUser(request.body.username, request.body.password)) {
    response.sendFile(path.join(__dirname, "/public", "notes.html"));
  } else {
    console.log("invalid user");
    response.sendFile(path.join(__dirname, "/public", "login_failed.html"));
  }
});

app.get("/notes", (request, response) => {
  response.sendFile(path.join(__dirname, "/public", "notes.html"));
});
