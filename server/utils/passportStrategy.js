const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const db = require("../utils/dbConfig");

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JWTStrategy(opts, (jwt_payload, next) => {
  db("users")
    .where({ id: jwt_payload.id })
    .first()
    .then((user) => {
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    });
});
module.exports = strategy;
