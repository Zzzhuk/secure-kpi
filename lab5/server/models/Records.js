const mongoose = require('mongoose');
const {Schema} = mongoose;

const Record = new Schema({
  login: String,
  password: String
});

module.exports = mongoose.model('Record', Record);
