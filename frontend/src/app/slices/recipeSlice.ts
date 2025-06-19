import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Recipe {
	id: number;
	title: string;
	ingredients: string;
	instructions: string;
}

interface RecipeState {
	generatedRecipes: Recipe[];
	savedRecipes: Recipe[];
}

const initialState: RecipeState = {
	generatedRecipes: [],
	savedRecipes: [],
};

const recipeSlice = createSlice({
	name: 'recipes',
	initialState,
	reducers: {
		addGeneratedRecipe: (state, action: PayloadAction<Recipe>) => {
			state.generatedRecipes.push(action.payload);
		},
		saveRecipe: (state, action: PayloadAction<Recipe>) => {
			state.savedRecipes.push(action.payload);
		},
		deleteSavedRecipe: (state, action: PayloadAction<number>) => {
			state.savedRecipes = state.savedRecipes.filter((r) => r.id !== action.payload);
		},
	},
});

export const { addGeneratedRecipe, saveRecipe, deleteSavedRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
