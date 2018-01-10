var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('', function(req, res) {
  mongoose.model('pins').find(function(err, pins) {
    res.send(pins);
  });
});

module.exports = router;
