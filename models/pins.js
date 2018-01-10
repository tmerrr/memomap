var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pinsSchema = new Schema({
  coordinates: Array
});

module.exports = mongoose.model('pins', pinsSchema)
