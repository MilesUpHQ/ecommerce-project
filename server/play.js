const knex = require("./utils/dbConfig");

knex("users")
  .select("*")
  .then((result) => console.log(result));
