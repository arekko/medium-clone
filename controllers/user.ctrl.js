const User = require('./../models/User')
const Article = require('./../models/Article')

module.exports = {

    /**
     * user_to_follow_id, user_id
     */
    followUser: (req, res, next) => {
        User.findById(req.body.id).then((user) => {
            return user.follow(req.body.user_id).then(() => {
                return res.json({
                    msg: "followed"
                })
            })
        }).catch(next)
    },


    getUserProfile: (req, res, next) => {
        User.findById(req.params.id).then((_user) => {
            return User.find({
                'following': req.params.id
            }).then((_users) => {
                _users.forEach((user_) => {
                    _user.addFollower(user_)
                });
                return Article.find({
                    'author': req.params.id})
                    .sort({date: -1})
                    .then((_articles) => {
                    return res.json({
                        user: _user,
                        articles: _articles
                    })
                })
            })
        }).catch((err) => console.log(err))
    },

    addBookmark: (req, res, next) => {
      User.findById(req.user.id).then((user) => {
        return user.addBookmark(req.params.id).then(() => {
          return res.json({
            msg: "article added"
          })
        })
      }).catch(next)
    },

  getUser: (req, res, next) => {
    User.findById(req.user._id)
      .populate('bookmarks')
      .then((user) => {
      if (!user)
        res.send(404);
      else
        res.send(user);
      next()
    })
  }
};