const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Login page
router.get('/login', (req, res) => {
  res.render('login', { errors: [] });
});

// Handle login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/reviews',
  failureRedirect: '/auth/login',
  failureFlash: false, // Add connect-flash for messages if desired
}));

// Logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/reviews');
  });
});

// Register (optional, for testing)
router.get('/register', (req, res) => {
  res.render('register', { errors: [] });
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.render('register', { errors: [{ msg: 'Username already exists' }] });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.redirect('/auth/login');
  } catch (err) {
    res.status(500).send('Error registering user');
  }
});

module.exports = router;