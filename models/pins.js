var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pinsSchema = new Schema({
  longitude: Number,
  latitude: Number,
  place: String,
  memory: String,
  imageurl: String
});

module.exports = mongoose.model('pins', pinsSchema)
