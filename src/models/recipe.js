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