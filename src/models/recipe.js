import pool from '../database.js';

// Lấy recipe list
export async function getRecipeList() {
    const [rows] = await pool.query(`
        SELECT RecipeID as recipeID, RecipeName as recipe_name, Descriptions as recipe_description, Path_img as recipe_image, CategoryName as category 
        FROM Food, FoodRecipe
        WHERE FoodRecipe.CategoryID = Food.ID
        ORDER BY CategoryID ASC
    `);

    return rows;
}

export async function getRecipe(RecipeID) {
    const [result] = await pool.query(`
        SELECT RecipeName, Descriptions, Ingredients, Instructions, Path_img 
        FROM FoodRecipe
        WHERE FoodRecipe.RecipeID = ?`, [RecipeID])

    //If undefined
    if(result.length == 0) {
        return result
    }

    return result[0]
}