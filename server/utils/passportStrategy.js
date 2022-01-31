const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require("../models/User");

const opts = {
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JWTStrategy(opts, (jwt_payload, next) => {
	User.forge({ id: jwt_payload.id })
		.fetch()
		.then((res) => {
			next(null, res);
		});
});
module.exports = strategy;
