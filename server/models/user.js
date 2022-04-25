const sequelize = require("../utils/sequelizeDbConfig");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password_digest: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  is_admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  avatar_url: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  createdAt: {
    type: Sequelize.DATE,
    field: "created_at",
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: "updated_at",
  },
});

User.beforeCreate((user) => {
  return bcrypt
    .hash(user.password_digest, 10)
    .then((hash) => {
      user.password_digest = hash;
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = User;
