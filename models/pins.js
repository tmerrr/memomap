var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pinsSchema = new Schema({
  _id: { String },
  longitude: Number,
  latitude: Number,
  comment: String
});

module.exports = mongoose.model('pins', pinsSchema)
