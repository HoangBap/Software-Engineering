import express from 'express';
import recipeController from '../controllers/recipe.js';

const router = express.Router();

router.get('/recipelist', recipeController.getRecipeList)

export default router;