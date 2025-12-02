const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
});

const userData = model("user", userSchema);

// Add a user
async function addUser(username, password) {
  const found = await userData.findOne({ username }).exec();
  if (found) return false;

  await userData.create({ username, password });
  return true;
}

// Check login using MongoDB
async function checkUser(username, password) {
  const foundUser = await userData.findOne({ username }).exec();
  if (!foundUser) return false;

  return foundUser.password === password;
}

module.exports = {
  addUser,
  checkUser,
};
