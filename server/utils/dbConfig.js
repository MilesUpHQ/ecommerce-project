const environment = process.env.NODE_ENV || "development";
const config = require("../knexfile")[environment];
const knex = require("knex")(config);

module.exports = knex;

// const knex = require("knex");

// const config = require("../knexfile.js");

// const db = knex(config);

// module.exports = db;
