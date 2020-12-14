var express = require('express');
var router = express.Router();
const User = require('../models').User;
const Admin = require('../models').admin;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(' HHHH ')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

passport.use(new LocalStrategy(
  {
    usernameField: 'email'
  },

function(email, password, done) {
  Admin.findOne({where: { email: email }})
        .then (function(admin)
          {
              if(!admin){
                console.log(email);
                return done(null, false, {message: 'Email is not correct'})
              }else{
                if (admin.comparePass(password)){
                  console.log(email);
                  return done(null, admin, {message: 'Logged in successfully'})
                }else{
                  console.log(email);
                  return done(null, false, {message: 'Password is not correct'})
                }
              }
          })
        .catch(function(err){
          done(err);
        });
  }));

passport.serializeUser(function (admin, done){
  done(null, admin.id);
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/register', function(req, res) {
  res.render('register', {errormessage: '', f_name: '', l_name: '', email: '', gender: ''});
});

/* POST home page. */
router.post('/login', 
  passport.authenticate('local', { successRedirect: '/',
                                  failureRedirect: '/login'})
);

router.post('/register', function(req, res) {
  let f_name = req.body.first_name;
  let l_name = req.body.last_name;
  let email = req.body.email;
  let gender = req.body.gender;    
  let pass1 = req.body.pass1;    
  let pass2 = req.body.pass2;    

  if (pass1 !== pass2) {
    res.render('register', { errormessage: 'the two passwords does not match', f_name, l_name, email, gender });
  } else {
    Admin.create({
      firstName: f_name,
      lastName: l_name,
      email: email,
      gender: gender,
      password: pass1
    }).then((admin)=>{
        res.render('login');
    }).catch(console.error);
  }

});

router.post('/', function(req, res, next) {
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.mail;
    let university = req.body.university;    
    let grad_year = req.body.grad_year;    
    let firstWorkshop = req.body.firstWorkshop;    
    let secondWorkshop = req.body.secondWorkshop; 
        
    let details = ` Name: ${name} \n 
                    Phone: ${phone} \n   
                    Email: ${email} \n
                    University: ${university} \n
                    Graduation Year: ${grad_year} \n
                    First Workshop: ${firstWorkshop} \n
                    Second Workshop: ${secondWorkshop} \n
    ` ;
    
    const msg = {
        to: 'mahmoudraafat2000@yahoo.com', // Change to your recipient
        from: 'dodo20002002@gmail.com', // Change to your verified sender
        subject: 'New participant Submission',
        text: details,
        }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
          console.log("Message sent: %s", msg);
        })
        .catch((error) => {
          console.error(error)
        })  
            
    User.create({
        Name: name,
        Phone: phone,
        Email: email, 
        University: university,
        Grad_year: grad_year,
        First_Workshop: firstWorkshop,
        Second_Workshop: secondWorkshop,
    }).then((user)=>{
            
//        id = user.id
//        name = user.Name
//        phone = user.Phone
//        mail = user.email
//        university = user.university
//        grad_year = user.grad_year
//        firstWorkshop = user.firstWorkshop
//        secondWorkshop = user.secondWorkshop
        res.render('THX', { name });
    }).catch(console.error);
  
});
module.exports = router;
