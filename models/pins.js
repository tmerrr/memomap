var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pinsSchema = new Schema({
  coordinates: Array
});

mongoose.model('pins', pinsSchema)
