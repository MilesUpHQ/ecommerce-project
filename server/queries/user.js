const db = require("../utils/dbConfig");
const bcrypt = require("bcrypt");

function insertUser(params) {
  return db("users").insert({
    email: params.email,
    password_digest: bcrypt.hashSync(params.password, 10),
    username: params.username,
    first_name: params.first_name,
    last_name: params.last_name,
  });
}

function getUserBy(field, value) {
  return db("users").where({ [field]: value });
}

module.exports = { insertUser, getUserBy };
