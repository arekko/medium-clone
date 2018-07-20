const Article = require('./../models/Article');
const User = require('./../models/User');
const fs = require('fs');
const cloudinary = require('cloudinary');

module.exports = {
  addArticle: (req, res, next) => {
    let {
      text,
      title,
      description
    } = req.body;
    if (req.files.image) {
      cloudinary.uploader.upload(req.files.image.path, (result) => {
        let obj = {
          text,
          title,
          description,
          feature_img: result.url != null ? result.url : ''
        };
        saveArticle(obj)
      }, {
        resource_type: 'image',
        eager: [{
          effect: 'sepia'
        }]
      })
    } else {
      saveArticle({
        text,
        title,
        description,
        feature_img: ''
      })
    }

    function saveArticle(obj) {
      new Article(obj).save((err, article) => {
        if (err)
          res.send(err);
        else if (!article)
          res.send(400);
        else {
          return article.addAuthor(req.body.author_id).then((_article) => {
            return res.send(_article)
          })
        }
        next()
      })
    }
  },
  getAll: (req, res, next) => {
    Article.find(req.params.id).sort({
        date: -1
      })
      .populate('author')
      .populate('comments.author').exec((err, article) => {
        if (err)
          res.send(err);
        else if (!article)
          res.send(404);
        else
          res.send(article);
        next()
      })
  },
  getArticle: (req, res, next) => {
    Article.findById(req.params.id)
      .populate('author')
      .populate('comments.author').exec((err, article) => {
        if (err)
          res.send(err);
        else if (!article)
          res.send(404);
        else
          res.send(article);
        next()
      })
  },
  likeArticle: (req, res) => {
    User.findOne({
        user: req.user.id
      })
      .then(profile => {
        Article.findById(req.params.id)
          .then(post => {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
              return res.status(400).json({
                alreadyliked: 'User already liked this post'
              })
            }

            //Add user id to likes array

            post.likes.unshift({
              user: req.user.id
            })
            post.save().then(post => res.json(post))
          })
          .catch(err => res.status(404).json({
            postnotfound: 'No post found'
          }))
      })
  }
}