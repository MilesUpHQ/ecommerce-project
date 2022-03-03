// Update with your config settings.
require("dotenv").config();
const options =
  process.env.NODE_ENV === "production"
    ? {
        client: "pg",
        connection: process.env.DATABASE_URL,
        ssl: { require: true, rejectUnauthorized: false },
      }
    : {
        client: process.env.DB_CLIENT,
        connection: {
          host: process.env.DB_HOST,
          database: process.env.DB_NAME,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
        },
        pool: { min: 2, max: 10 },
        migrations: { tableName: "knex_migrations" },
      };
module.exports = options;
