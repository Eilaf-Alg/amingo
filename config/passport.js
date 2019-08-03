const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../models/User');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

//Everything below is boilerplate, used for all types of authentications (FB, linkedin, basic email psswd etc...)
// passport in the line below is the fuction's name, passport is a function, arrow syntax is used
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id) //findById function puts the user inside the response "res" object. finds the user through the ID
        .then(user => {
          if (user) {
            return done(null, user); //returns the user here
          }
          return done(null, false);
        })
        .catch(err => done(null, null));
    })
  );
};