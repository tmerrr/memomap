var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/users');

router.get('', function(req, res) {
  User.find(function(err, users) {
    res.send(users);
  });
});

router.get('/:userId', function(req, res) {
  User.find({ id: req.params.userId }, function(err, users) {
    res.send(users);
  });
});

router.post('/login', function(req, res) {
  User.find({ id: req.body.id}, function(err, user){
    if (user){
      res.send(user);
    } else {
      var newUser = new User({
        fbId: req.body.fbId,
        name: req.body.name,
        email: req.body.email
      })
      newUser.save(function(err){
        if(err) throw(err);
      })
      res.send(newUser)
    }
  })

})


module.exports = router;
