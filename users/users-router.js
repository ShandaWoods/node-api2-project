const router = require('express').Router();

router.get('/', (req, res) => {
  console.log('query string', req.query);
  res.status(200).json(req.query);
});

module.exports = router;
