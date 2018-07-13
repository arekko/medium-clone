
const Article = require('./../models/Article');
const User = require('./../models/User');
const fs = require('fs');
const cloudinary = require('cloudinary');

module.exports = {
  addArticle: (req, res, next) => {
    let { text, title, description } = req.body;
    if (req.files.image) {
      cloudinary.uploader.upload(req.files.image.path, (result) => {
        let obj = { text, title, description, feature_img: result.url != null ? result.url : '' };
        saveArticle(obj)
      },{
        resource_type: 'image',
        eager: [
          {effect: 'sepia'}
        ]
      })
    }else {
      saveArticle({ text, title, description, feature_img: '' })
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
    Article.find(req.params.id)
      .populate('author')
      .populate('comments.author').exec((err, article)=> {
      if (err)
        res.send(err);
      else if (!article)
        res.send(404);
      else
        res.send(article);
      next()
    })
  },
}