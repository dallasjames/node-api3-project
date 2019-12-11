const express = require('express');
const Users = require("./userDb");
const Posts = require("../posts/postDb");

const router = express.Router();

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

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;

  Users.getById(id)
    .then(userId => {
      if (userId) {
        userId = req.user;
        next();
      } else {
        res.status(400).json({ errorMessage: "Invalid user id." });
      }
    })
    .catch(error => {
      console.log(
        res
          .status(500)
          .json({ error: "There was an error validating the user id" })
      );
    });
}

function validateUser(req, res, next) {
  const newUser = req.body;

  if (!newUser) {
    res.status(400).json({ message: "Missing user data" });
  } else if (!newUser.name) {
    res.status(400).json({ message: "Missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const posts = req.body;

  if (!posts) {
    res.status(400).json({ message: "Missing user data" });
  } else if (!posts.text) {
    res.status(400).json({ message: "Missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
