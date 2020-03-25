const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = mongoose.model('User');

router.post('/signup', async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = new User({ email, password });

    await user.save();

    const token = jwt.sign({ userId: user._id }, 'SECRET_KEY')

    res.send({ token: token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({error: 'must provide email and pass'});
  }

  const user = await User.findOne({ email });
  if(!user) {
    return res.status(404).send({ error: 'Email or password invalid'});
  }
  try{
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'SECRET_KEY')
    res.send({token});
  } catch(err) {
    return res.status(404).send({ error: 'Email or password invalid' })
  }
  });

module.exports = router;
