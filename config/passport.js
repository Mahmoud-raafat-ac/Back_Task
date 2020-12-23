const Admin = require('../models').admin;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

passport.serializeUser(function(admin, done) {
    done(null, admin.id);
  });
   
passport.deserializeUser(function(id, done) {
    Admin.findByPk(id, function (err, admin) {
      done(err, admin);
    });
  });

passport.use('local', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },    
       function(email, password, done) {
        Admin.findOne({where: { email: email }})
            .then (function(admin)
            {
                if(!admin){
                    console.log(email);
                    return done(null, false, {message: 'Email does not exist'})
                }else{
                    if (admin.password === password){
                    console.log(email);
                    console.log("welcome")
                    return done(null, admin)
                    }else{
                    console.log(email);
                    return done(null, false, {message: 'Password is not correct'})
                    }
                }
            })
            .catch(function(err){
                console.log(err);
            });
  }));

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  }

// passport.use(new LocalStrategy(
 
//     {
//         usernameField: 'email',
//         passwordField: 'password',
//         passReqToCallback: true // allows us to pass back the entire request to the callback
 
//     },function(email, password, done) {
//           Admin.findOne({where: { email: email }})
//                 .then (function(admin)
//                   {
//                       if(!admin){
//                         console.log(email);
//                         return done(null, false, {message: 'Email is not correct'})
//                       }else{
//                         if (admin.verifyPassword(password)){
//                           console.log(email);
//                           return done(null, admin, {message: 'Logged in successfully'})
//                         }else{
//                           console.log(email);
//                           return done(null, false, {message: 'Password is not correct'})
//                         }
//                       }
//                   })
//                 .catch(function(err){
//                   done(err);
//                 });
// }));

