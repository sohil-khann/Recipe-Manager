const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  ingredients: {
    type: String,
    required: true,
    trim: true
  },
  cookingTime: {
    type: Number,
    required: true,
    min: 1
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  },
  instructions: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema); 