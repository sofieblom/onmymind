const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJtw = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const dotenv = require("dotenv");
dotenv.config();

const opts = {}; 
opts.jwtFromRequest = ExtractJtw.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
            .then(user => {
                if(user) {
                    return done(null, user)
                }
                return done(null, false)
            })
            .catch(err => console.log(err))
        })
    )
}