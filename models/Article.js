const mongoose = require('mongoose');
const Schema = mongoose.Schema


let ArticleSchema = new Schema({
  text: String,
  title: String,
  description: String,
  feature_img: String,
  likes: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    date: {
      type: Date,
      default: Date.now()
    }
  }]
});


module.exports = mongoose.model("Article", ArticleSchema)