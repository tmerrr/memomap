var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pinsSchema = new Schema({
  longitude: Number,
  latitude: Number
});

module.exports = mongoose.model('pins', pinsSchema)
