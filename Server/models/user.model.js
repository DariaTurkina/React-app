const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  email: { type: String, required: true, max: 40 },
  pwd: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);