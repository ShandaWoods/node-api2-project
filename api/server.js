const express = require('express');

const Posts = require('./comments-module.js'); // don't forget to import anything needed

const router = express.Router();

// a Router can have middleware
// a Router can have endpoints

// this router only cares about whatever comes after /
router.get('/', (req, res) => {
  Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the posts',
      });
    });
});

router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then(comments => {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ message: 'Comments not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the comments',
      });
    });
});

router.post('/', (req, res) => {
  Posts.add(req.body)
    .then(comments => {
      res.status(201).json(comments);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the comment',
      });
    });
});

router.delete('/:id', (req, res) => {
  Posts.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The post has been nuked' });
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Posts.update(req.params.id, changes)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the post',
      });
    });
});

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

module.exports = router;

// create file for the Router
// write code to create a router: require('express').Router();
// export it
// require and use the router on server.js: server.use('/api/hubs', hubsRouter)
