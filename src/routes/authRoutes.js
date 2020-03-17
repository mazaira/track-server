const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const User = mongoose.model('User');

router.post('/signup', async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = new User({ email, password });

    await user.save();

    res.send('user created');
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
