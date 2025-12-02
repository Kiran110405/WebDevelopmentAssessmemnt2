const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
});

const userData = model("user", userSchema);

async function addUser(usernameFromForm, password) {
  let found = null;
  found = await userData.findOne({ username: usernameFromForm }).exec();
  if (found) {
    return false;
  } else {
    let newUser = {
      username: usernameFromForm,
      password: password,
    };
    await userData.create(newUser);
    return true;
  }
}

function checkUser(username, password) {
  let foundUser = findUser(username);
  if (foundUser) {
    return foundUser.password == password;
  }
  return false;
}

function findUser(username) {
  return users.find((thisUser) => thisUser.username == username);
}

module.exports = {
  addUser,
  checkUser,
};
