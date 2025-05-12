const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');


const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Please log in first');
  res.redirect('/login');
};


router.get('/', isAuthenticated, async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('author', 'username');
    res.render('recipes/index', { recipes });
  } catch (err) {
    req.flash('error', 'Error fetching recipes');
    res.redirect('/');
  }
});


router.get('/new', isAuthenticated, (req, res) => {
  res.render('recipes/new');
});

router.post('/', isAuthenticated, async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    recipe.author = req.user._id;
    await recipe.save();
    req.flash('success', 'Recipe created successfully!');
    res.redirect('/recipes');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/recipes/new');
  }
});


router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'username');
    if (!recipe) {
      req.flash('error', 'Recipe not found');
      return res.redirect('/recipes');
    }
    res.render('recipes/show', { recipe });
  } catch (err) {
    req.flash('error', 'Error fetching recipe');
    res.redirect('/recipes');
  }
});


router.get('/:id/edit', isAuthenticated, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      req.flash('error', 'Recipe not found');
      return res.redirect('/recipes');
    }
    if (!recipe.author.equals(req.user._id)) {
      req.flash('error', 'You do not have permission to edit this recipe');
      return res.redirect('/recipes');
    }
    res.render('recipes/edit', { recipe });
  } catch (err) {
    req.flash('error', 'Error fetching recipe');
    res.redirect('/recipes');
  }
});


router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      req.flash('error', 'Recipe not found');
      return res.redirect('/recipes');
    }
    if (!recipe.author.equals(req.user._id)) {
      req.flash('error', 'You do not have permission to edit this recipe');
      return res.redirect('/recipes');
    }
    
    
    const { dishName, ...updateData } = req.body;
    
    await Recipe.findByIdAndUpdate(req.params.id, updateData);
    req.flash('success', 'Recipe updated successfully!');
    res.redirect(`/recipes/${req.params.id}`);
  } catch (err) {
    req.flash('error', err.message);
    res.redirect(`/recipes/${req.params.id}/edit`);
  }
});


router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      req.flash('error', 'Recipe not found');
      return res.redirect('/recipes');
    }
    if (!recipe.author.equals(req.user._id)) {
      req.flash('error', 'You do not have permission to delete this recipe');
      return res.redirect('/recipes');
    }
    await Recipe.findByIdAndDelete(req.params.id);
    req.flash('success', 'Recipe deleted successfully!');
    res.redirect('/recipes');
  } catch (err) {
    req.flash('error', 'Error deleting recipe');
    res.redirect('/recipes');
  }
});

module.exports = router; 