var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pinsSchema = new Schema({
  longitude:  Number,
  latitude:   Number,
  place:      String,
  memory:     String,
  activity:   String,
  date:       { type: Date, default: Date.now },
  imageurl:   String,
  userFbId:   Number
});

module.exports = mongoose.model('pins', pinsSchema)
