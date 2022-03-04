const db = require("./utils/dbConfig");

// knex("users")
//   .select("*")
//   .then((result) => console.log(result));
  db("products").insert({
    name: "x",
    description: "dcf",
    category_id: 2,
}).returning("products.id").then((result)=> console.log(result));