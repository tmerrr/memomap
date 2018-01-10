var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('', function(req, res) {
  mongoose.model('pins').find(function(err, pins) {
    res.send(pins);
  });
});

router.post('/new', function(req, res) {

  var pinModel = mongoose.model('pins')
  var pin = new pinModel(req.body)
  pin.save(function(err) {
    if(err) throw err;

  });
  res.send(pin)
});

module.exports = router;
