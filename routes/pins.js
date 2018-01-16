var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer')
var bodyParser = require('body-parser')

let Pin = require('../models/pins.js')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/public/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage }).single('image');

router.get('', function(req, res) {
  Pin.find(function(err, pins) {
    res.send(pins);
  });
});

router.post('/users_pins', function(req, res) {
  console.log('--- Post Request for Pins Ran ---')
  console.log(req.body)
  Pin.find({ userFbId: req.body.userFbId }, function(err, pins) {
    console.log('--- Pins: ', pins)
    res.send(pins)
  })
})

router.post('/new', function(req, res) {
  console.log(req.body)
  var pin = new Pin(req.body)
  pin.save(function(err) {
    if(err) throw err;
  });
  res.send(pin)
});

router.post('/update', function(req, res) {
  upload(req, res, function (err) {
    console.log("BODY", req.body)
      Pin.findByIdAndUpdate(req.body._id, { comment: req.body.comment, imageurl: req.body.imageurl }, function(err, pin) {
        if (err) throw err;
      });
      res.send()
    if (err) {
      console.log("image not uploaded")
      // An error occurred when uploading
    }
    // res.json({
    //   success: true,
    //   message: 'Image uploaded'
    // })
    // Everything went fine
  })
});

router.post('/delete', function(req, res) {
  Pin.findOneAndRemove({_id: req.body._id}, function(err){
    if (err) throw err
  })
  res.sendStatus(200)
});

module.exports = router;
