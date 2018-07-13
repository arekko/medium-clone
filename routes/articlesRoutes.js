const articlecontroller = require('./../controllers/article.ctrl');
const multipart = require('connect-multiparty');
const multipartWare = multipart();
const express = require('express')
const router = express.Router();

// module.exports = (router) => {
  /**
   * get all articles
   */
  router
    .route('/articles')
    .get(articlecontroller.getAll);
  /**
   * add an article
   */
  router
    .route('/article')
    .post(multipartWare, articlecontroller.addArticle);
  /**
   * comment on an article
   */
  // router
  //   .route('/article/comment')
  //   .post(articlecontroller.commentArticle);
  // /**
  //  * get a particlular article to view
  //  */
  // router
  //   .route('/article/:id')
  //   .get(articlecontroller.getArticle)

  router
    .route('hello')
    .get((req, res) => {
      res.send('hello')
    })

// 
module.exports = router


