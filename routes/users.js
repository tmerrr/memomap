var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


router.get('', function(req, res) {
  mongoose.model('users').find(function(err, users) {
    res.send(users);
  });
});

router.get('/:userId', function(req, res) {
  mongoose.model('users').find({ id: req.params.userId }, function(err, users) {
    res.send(users);
  });
});


module.exports = router;
