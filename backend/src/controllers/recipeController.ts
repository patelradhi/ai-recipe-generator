import { GoogleGenerativeAI } from '@google/generative-ai';
import { Request, Response } from 'express';
import Recipe from '../models/recipeModel.js';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();
const API_KEY_GEMINI = process.env.API_KEY_GEMINI;

//recipe generation

// Initialize Gemini with your API Key
const genAI = new GoogleGenerativeAI(API_KEY_GEMINI!);

export const generateRecipe = async (req: Request, res: Response) => {
	try {
		const { ingredients, cuisine } = req.body;
		console.log(ingredients, 'ingredients');
		console.log(cuisine, 'cuisine');

		const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

		// Prompt that instructs Gemini to return a structured JSON
		const prompt = `
		You are a master chef and AI trained on global cuisine. Your task is to generate **authentic, delicious, and culturally valid recipes** in JSON format.
		
		You will receive:
		- Cuisine: ${cuisine || 'None'}
		- Ingredients: ${ingredients}
		
		Rules:
		
		1. **Validate the input combination**:
		   - If the ingredients are contradictory, unnatural, or not used together in any known or plausible recipe (e.g., garlic + milk), respond with: 
			 {
			   "error": "The given combination of ingredients does not form a meaningful or traditional recipe. Please revise your selection."
			 }
		
		2. **If only ingredients are given**:
		   - Create a realistic and tasty recipe using those ingredients, adjusting slightly if needed.
		   - Avoid making up strange dishes; instead, return an error if the input is too odd.
		
		3. **If both cuisine and ingredients are given**:
		   - Only use the provided ingredients.
		   - Try to match them to an existing or culturally plausible recipe from that cuisine.
		   - If they don't match any real recipe, and you can't create a realistic dish using those ingredients, return the error response.
		
		Output must be ONLY one of the following:
		A. A valid JSON object:
		{
		  "title": "Recipe Name",
		  "ingredients": ["Ingredient 1", "Ingredient 2", "..."],
		  "instructions": ["Step 1", "Step 2", "..."]
		}
		
		OR
		
		B. A rejection in this format:
		{
		  "error": "The given combination of ingredients does not form a meaningful or traditional recipe. Please revise your selection."
		}
		`;
		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = await response.text();

		// Optional: Safely parse JSON
		let cleanText = response
			.text()
			.trim()
			.replace(/^```json|^```|```$/g, '')
			.trim();

		// If Gemini wrapped it in code blocks, remove them

		let recipe;
		try {
			recipe = JSON.parse(cleanText);
			res.status(200).json({ recipe });
		} catch (err) {
			console.error(' JSON parsing failed:', cleanText);
			res.status(500).json({ error: 'Gemini returned invalid JSON. Try again.' });
		}
	} catch (error) {
		let err = error as Error;

		console.error('Gemini JSON parsing error:', err.message);
		res.status(500).json({ error: 'Failed to generate structured recipe' });
	}
};

//save recipe
export const saveRecipe = async (req: Request, res: Response) => {
	try {
		const { title, ingredients, instructions } = req.body;
		const userId = (req as any).auth?.userId;
		const recipe = new Recipe({ title, ingredients, instructions, userId });
		await recipe.save();
		res.status(201).json({ recipe });
	} catch (error) {
		let err = error as Error;

		console.error('MongoDB query error:', err.message);
		res.status(500).json({ error: 'Failed to save recipe' });
	}
};

//view  saved recipe by id
export const getSavedRecipes = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).auth?.userId;
		if (!userId) return res.status(401).json({ message: 'Unauthorized' });

		const recipes = await Recipe.find({ userId: userId });

		res.status(200).json({ recipes });
	} catch (err) {
		console.error('Error fetching recipes:', err);
		res.status(500).json({ message: 'Failed to fetch recipes' });
	}
};
//delete recipe by id
export const deleteSavedRecipe = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).auth?.userId;
		console.log(userId, 'userId');
		const recipeId = req.params.Id;
		console.log(recipeId, 'recipeId');

		if (!userId) return res.status(401).json({ message: 'Unauthorized' });

		const recipe = await Recipe.findOne({ _id: recipeId, userId: userId });

		if (!recipe) return res.status(404).json({ message: 'Recipe not found or not owned by user' });

		await Recipe.deleteOne({ _id: recipeId });

		res.status(200).json({ message: 'Recipe deleted successfully' });
	} catch (err) {
		console.error('Error deleting recipe:', err);
		res.status(500).json({ message: 'Failed to delete recipe' });
	}
};
