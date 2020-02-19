const post = require("../posts/postDb")

function validatePostId(req, res, next) {
    const { id } = req.params
  
    post.getById(id)
      .then(postID => {
        if (postID) {
          postID = req.post
          next()
        } else {
          res.status(404).json({ errorMessage: "post not found"})
        }
      })
  }

module.exports = validatePostId