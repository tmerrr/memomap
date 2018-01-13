var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

let Pin = require('../models/pins.js')

router.get('', function(req, res) {
  mongoose.model('pins').find(function(err, pins) {
    res.send(pins);
  });
});

router.post('/new', function(req, res) {
  console.log(req.body)
  var pin = new Pin(req.body)
  // console.log(req)
  // console.log(res)
  pin.save(function(err) {
    if(err) throw err;
  });
  res.send(pin)
});

router.post('/update', function(req, res) {
  Pin.findByIdAndUpdate(req.body._id, { comment: req.body.comment }, function(err, pin) {
    if (err) throw err;
  });
  res.send()
});

router.post('/delete', function(req, res) {
  Pin.remove({}, function(err, res) {
    if (err) throw err
  });
  res.sendStatus(200)
});

module.exports = router;
