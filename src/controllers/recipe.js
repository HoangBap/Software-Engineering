import { getRecipeList } from '../models/recipe.js';
const recipeController = {}

recipeController.getRecipeList = async(req, res) => {
    const RecipeList = await getRecipeList();
    res.json(RecipeList)
}

export default recipeController;