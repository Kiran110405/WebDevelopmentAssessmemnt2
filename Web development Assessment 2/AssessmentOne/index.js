const express = require("express"); //declares content of express module of express folder available in this file
const app = express(); //executes the function
const path = require("path");

//const posts = require("./models/posts");
const users = require("./models/users");

const userModel = require("./models/users");

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Listening on port 3000"); //outputs to the console to show that its working
});

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.get("/map", (request, response) => {
  response.sendFile(path.join(__dirname, "/public", "map.html"));
});

app.get("/login", (request, response) => {
  response.sendFile(path.join(__dirname, "/public", "login.html"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (users.checkUser(username, password)) {
    return res.sendFile(path.join(__dirname, "/views", "notes.html"));
  }

  return res.sendFile(path.join(__dirname, "/views", "login_failed.html"));
});

app.get("/register", (request, response) => {
  response.sendFile(path.join(__dirname, "/public", "register.html"));
});

app.post("/register", (request, response) => {
  if (users.addUser(request.body.username, request.body.password)) {
    response.sendFile(path.join(__dirname, "/public", "login.html"));
  }
  response.sendFile(
    path.join(__dirname, "/public", "registration_failed.html")
  );
});

app.get("/notes", (request, response) => {
  response.sendFile(path.join(__dirname, "/public", "notes.html"));
});
