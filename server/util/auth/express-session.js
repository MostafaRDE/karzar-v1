const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const uuid = require('uuid');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {UserModel} = require('../../Models/UserModel');
const passportOneSessionPerUser = require('passport-one-session-per-user');


module.exports = (app) => {

    passport.use(new LocalStrategy(
        { usernameField : 'email' , passReqToCallback:true},
        (req , email , password , done) => {
            return done(null , {id : req.user_data.id })
        }
    ));

    passport.serializeUser((user , done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        let userModel = new UserModel();
        userModel.fetch_one('id , email , name , mobile_number , blocked_at' , ['id'] , [id])
        .then(data => {
            if (data && !data.blocked_at) {
                return done(null, data);
            } else {
                return done(null, false)
            }
        })
        .catch(err => {
            return done(null, false)
        })
    });


    app.use(session({
        genid : (req) => {
            return uuid();
        },
        store : new MongoStore({
            url: process.env.MONGO_URL_DB + '/' + process.env.MONGO_DB_NAME,
            ttl:  5 * 60 * 60,
            mongoOptions : { useUnifiedTopology: true }
        }),
        secret : process.env.APP_SECRET,
        resave : false,
        saveUninitialized : true,
        secure : true
    }));

    passport.use(new passportOneSessionPerUser());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(passport.authenticate('passport-one-session-per-user'));
};
