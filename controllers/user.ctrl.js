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

  removeBookmark: (req, res, next) => {

    User.findById(req.user._id)
      .then(user => {
        if(user.bookmarks.filter(bookmark => bookmark.toString() === req.body.id) === 0) {
          return res.status(400).json({ err: 'You didnt bookmark this article'})
        }
        const removeIndex = user.bookmarks.map( bookmark => bookmark.toString()).indexOf(req.params.id)

        user.bookmarks.splice(removeIndex, 1)

        user.save().then(user => res.json(user))
      }).catch(err => res.status(404).json({ postnotfound: 'No post found'}))

  },

  getUser: (req, res, next) => {
    User.findById(req.user._id)
      .populate({
        path: 'bookmarks',
        model: 'Article',
        populate: {
          path: 'author',
          model: 'User'
        }
      })
      .then((user) => {
      if (!user)
        res.send(404);
      else
        res.send(user);
      next()
    })
  }
};