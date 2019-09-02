const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Users } = require("./database/database");
// const bcrypt = require("bcrypt");

passport.use("user", new LocalStrategy((username, password, done) => {
    Users.findOne({
        where: {
            username 
        }
    })
        .then(user => {
            if(!user)
                return done(null, false);
            // else if(bcrypt.compare(password, user.password, (err, res) => res))
            else if(password != user.password)
                return done(null, false);
            else 
                return done(null, user);
        });
}));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((userId, done) => {
    Users.findOne({
        where: {
            id: userId 
        }
    })
        .then(user => done(null, user));
});

module.exports = { 
    passport
}