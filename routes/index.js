var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var router = express.Router();
var User = require('../modules/User');

mongoose.connect('mongodb://localhost/test', function (err) {
  if(err){
    console.log('Could not connect to mongodb on localhost');
  }
  else{
    console.log('Successfully connected to mongodb');
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function (req,res) {
  User.register(new User({username:req.body.username}), req.body.password, function (err) {
    if (err) {
      res.status(400).json({message: 'Username has been registered'});
    }
    else {
      res.status(200).json({message: 'Register success'});
    }
  });
});

router.post('/login', passport.authenticate('local'), function (req,res) {

  console.log(req.user);
  res.status(200).json({message:'login success'});
});

module.exports = router;
