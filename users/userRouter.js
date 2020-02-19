const express = require('express');
const Users = require("./userDb");
const Posts = require("../posts/postDb");
const validatePost = require("../middleware/validatePost")
const validateUser = require("../middleware/validateUser")
const validateUserId = require("../middleware/validateUserId")

const router = express.Router();

router.get('/', (req, res) => {
  Users.get()
  .then(users => {
      res.status(200).json(users)
  })
  .catch(err => {
      res.status(500).json({ message: "I am fixing it" })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  let id = req.params.id
  if (id) {
      Users.getById(id)
          .then(user => {
              res.status(200).json(user)
          })
          .catch(err => {
              res.status(500).json({ message: "I am fixing it" })
          })
  } else {
      res.status(404).json({ message: "User not found" })
  }
});

router.get("/:id/posts", validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error getting the posts for this user" });
    });
});

router.post('/', validateUser, (req, res) => {
  let user = req.body
  Users.insert(user)
      .then(user => {
          res.status(201).json(user)
      })
      .catch(err => {
          res.status(500).json({
              error: "I'm workin on it"
          })
      })
});

router.post("/:id/posts", validatePost, (req, res) => {
  const postInfo = { ...req.body, user_id: req.params.id };

  Posts.insert(postInfo)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error posting this post" });
    });
});

router.put('/:id', validateUserId, (req, res) => {
  let id = req.params.id
  let update = req.body
  Users.update(id, update)
      .then(updated => {
          res.status(200).json(updated)
      })
      .catch(err => {
          res.status(500).json({
              error: " give me a minute"
          })
      })
});

router.delete('/:id', validateUserId, (req, res) => {
  id = req.params.id
  Users.remove(id)
      .then( user => {
          res.status(204).json({
              message: "user deleted"
          })   
      })
      .catch(err => {
          res.status(500).json({
              error: "Hey I'm doin my best"
          })
      })
});

module.exports = router