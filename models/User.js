const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  googleid: String,
  googletoken: String,
  avatar: String,
  phone: String,
  followers:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
})


module.exports = mongoose.model('User', UserSchema)
