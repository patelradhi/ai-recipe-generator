import { Router } from 'express';
import { generateRecipe, saveRecipe, getSavedRecipes, deleteSavedRecipe } from '../controllers/recipeController.js';

const recipeRoute = Router();

recipeRoute.post('/generate', generateRecipe);
recipeRoute.get('/view/saved', getSavedRecipes);
recipeRoute.delete('/delete/:Id', deleteSavedRecipe);
recipeRoute.post('/save', saveRecipe);

export default recipeRoute;
