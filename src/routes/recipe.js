import express from 'express';
import recipeController from '../controllers/recipe.js';
import { checkValid } from '../middleware/checkValid.js';

const router = express.Router();

router.get('/recipelist', recipeController.getRecipeList)
router.get('/foodportion', checkValid, recipeController.ViewFoodPortion)
router.get('/recipe/:id', checkValid, recipeController.viewRecipe)

export default router;