const express = require('express');

const router = express.Router();

router.post('/signup', (req, res) => {
  res.send('tried to signup');
});

module.exports = router;
