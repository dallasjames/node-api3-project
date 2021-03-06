const express = require('express');
const post = require("./postDb")

const router = express.Router();

router.get('/', (req, res) => {
  post.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      res.status(500).json({
        error: "Internal server error"
      })
    })
});

router.get('/:id', validatePostId, (req, res) => {
  post.getById(req.params.id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(error => {
      res.status(500).json({
        error: "Internal server error"
      })
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  let id = req.params.id
  post.remove(id)
      .then( user => {
          res.status(204).json({
              message: "post deleted"
          })   
      })
      .catch(err => {
          res.status(500).json({
              error: "internal error"
          })
      })
});

router.put('/:id', validatePostId, (req, res) => {
  let id = req.params.id
  let update = req.body
  post.update(id, update)
      .then(updated => {
          res.status(200).json(updated)
      })
      .catch(err => {
          res.status(500).json({
              error: "error come back later"
          })
      })
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params

  post.getById(id)
    .then(postID => {
      if (postID) {
        postID = req.post
        next()
      } else {
        res.status(404).json({ errorMessage: "user not found"})
      }
    })
}

module.exports = router;
