const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');


const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Please log in first');
  res.redirect('/login');
};


router.get('/register', (req, res) => {
  res.render('register');
});


router.post('/register', async (req, res) => {
  try {
    const { username, password, fullName, country, dietaryPreference } = req.body;
    const user = new User({ username, password, fullName, country, dietaryPreference });
    await user.save();
    req.flash('success', 'Registration successful! Please log in.');
    res.redirect('/login');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/register');
  }
});


router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/recipes',
  failureRedirect: '/login',
  failureFlash: true
}));


router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success', 'Logged out successfully');
    res.redirect('/login');
  });
});


router.get('/', (req, res) => {
  res.redirect('/recipes');
});

module.exports = router; 