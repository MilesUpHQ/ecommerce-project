const db = require("../utils/dbConfig");
const bookshelf = require("bookshelf")(db);
const securePassword = require("bookshelf-secure-password");
bookshelf.plugin(securePassword);

const User = bookshelf.Model.extend({
	tableName: "users",
	hasSecurePassword: true,
});

module.exports = User;
