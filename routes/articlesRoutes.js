const articlecontroller = require('./../controllers/article.ctrl');
const multipart = require('connect-multiparty');
const multipartWare = multipart();
const express = require('express')
const router = express.Router();

const usercontroller = require('../controllers/user.ctrl')

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
router
  .route('/article/:id')
  .get(articlecontroller.getArticle)

router
  .route('/article/like')
  .post(articlecontroller.likeArticle)

router
  .route('/user/profile/:id')
  .get(usercontroller.getUserProfile)

router
  .route('/user/follow')
  .post(usercontroller.followUser)


//TODO: add the private middleware!!!!!

//@route    Post api/posts/like/:id
//@desc     Like post
//@access   Private
router
  .route('/posts/like/:id')
  .post(articlecontroller.likeArticle)

//@route    Post api/posts/unlike/:id
//@desc     unLike post
//@access   Private
router
  .route('/posts/unlike/:id')
  .post(articlecontroller.unlikeArticle)


// 
module.exports = router