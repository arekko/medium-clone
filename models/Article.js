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
    }
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    date: {
      type: Date,
      default: Date.now()
    },
    text: String
  }],
  date: {
    type: Date,
    default: Date.now()
  }
});

ArticleSchema.methods.addComment = function(comment) {
  this.comments.push(comment)
  return this.save()
}

ArticleSchema.methods.addAuthor = function (author_id) {
  this.author = author_id
  return this.save()
}
ArticleSchema.methods.addLike = function () {
  this.likes++
    return this.save()
}

module.exports = mongoose.model("Article", ArticleSchema)
