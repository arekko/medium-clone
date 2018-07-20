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

UserSchema.methods.follow = function (user_id) {
  if (this.following.indexOf(user_id) === -1) {
    this.following.push(user_id)
  }
  return this.save()
}

UserSchema.methods.addFollower = function (fs) {
  this.followers.push(fs)        
}


module.exports = mongoose.model('User', UserSchema)
