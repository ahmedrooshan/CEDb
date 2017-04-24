const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Scheme
const cUserSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  regno:{
    type: String,
    required: true
  },
  telephone:{
    type: String,
    required: true
  },
  website:{
    type: String,
    required: true
  },
  youtube_channel:{
    type: String,
    required: true
  },
  logo:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
});

const cUser = module.exports = mongoose.model('cUser', cUserSchema);

module.exports.getUserById = function (id, callback) {
  cUser.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
  const query = {username: username}
  cUser.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) =>{
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
  });
  });
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}