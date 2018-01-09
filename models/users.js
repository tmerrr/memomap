var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  id: Number,
  name: String
});

mongoose.model('users', usersSchema);
