import { getRecipeList, getRecipe } from '../models/recipe.js';
const recipeController = {}

recipeController.getRecipeList = async(req, res) => {
    const RecipeList = await getRecipeList();
    res.json(RecipeList)
}

recipeController.viewRecipe = async(req, res) => {
    const RecipeID = req.params.id
    const recipe = await getRecipe(RecipeID)
    
    if(recipe.length == 0) {
        res.render('norecipe')
        return
    }

    res.render('recipe', {RecipeName: recipe.RecipeName, Descriptions: recipe.Descriptions, Ingredients: recipe.Ingredients, Instructions: recipe.Instructions, Path_img: recipe.Path_img})
}

recipeController.ViewFoodPortion = async (req, res) => {
    res.render('foodportion')
}

export default recipeController;