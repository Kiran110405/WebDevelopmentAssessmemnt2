let users = [
  //users that are already stored in the database
  {
    username: "user1",
    password: "123",
  },
  {
    username: "user2",
    password: "456",
  },
];

function addUser(username, password) {
  let existingUser = findUser(username);
  if (!exisitinguser) {
    let newUser = {
      username: username,
      password: password,
    };
    users.push(newUser);
    return true;
  }
}
return false;

function checkUser(username, password) {
  let foundUser = findUser(username); //check if username exists in database of users
  if (foundUser) {
    return foundUser.password == password; //checks that the user matches the password
  }
  return false; //If doesnt match return as false
}

function findUser(username) {
  return users.find((thisUser) => thisUser.username == username);
}

function getusers() {}

module.export = {
  addUser,
  checkUser,
  findUser,
};
