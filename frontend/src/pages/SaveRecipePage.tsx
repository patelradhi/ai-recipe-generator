// src/pages/SaveRecipePage.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import RecipeCard from '@/components/RecipeCard';
import { toast } from 'react-toastify';

type Recipe = {
	_id: string;
	title: string;
	ingredients: string[];
	instructions: string[];
};

export default function SaveRecipePage() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [loading, setLoading] = useState(true);
	const { getToken } = useAuth();

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const token = await getToken();
				const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/recipe/view/saved`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data = await res.json();
				if (res.ok) {
					setRecipes(data.recipes);
				} else {
					toast.error(data.message || 'Failed to fetch recipes');
				}
			} catch (error) {
				toast.error('Error fetching recipes');
			} finally {
				setLoading(false);
			}
		};

		fetchRecipes();
	}, [getToken]);

	const handleDelete = async (id: string) => {
		try {
			const token = await getToken();
			const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/recipe/delete/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (res.ok) {
				toast.success('Recipe deleted');
				setRecipes((prev) => prev.filter((r) => r._id !== id));
			} else {
				const data = await res.json();
				toast.error(data.message || 'Failed to delete');
			}
		} catch (err) {
			console.error(err);
			toast.error('Error deleting recipe');
		}
	};

	return (
		<div className="min-h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]  flex flex-col items-center px-4 py-10">
			<h1 className="text-3xl font-extrabold text-white mb-8 tracking-tight flex items-center gap-2">
				<span role="img" aria-label="saved">
					🪄
				</span>{' '}
				Saved Recipes
			</h1>

			{loading ? (
				<p className="text-white">Loading...</p>
			) : recipes.length === 0 ? (
				<p className="text-2xl font-extrabold text-white mt-10 tracking-tight">No saved recipes found.</p>
			) : (
				<div className="w-full max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide px-2">
					<div
						className={`w-full max-w-6xl mx-auto grid gap-6 
							${
								recipes.length === 1
									? 'grid-cols-1 place-items-center'
									: recipes.length === 2
									? 'grid-cols-1 sm:grid-cols-2 place-content-center'
									: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
							}`}
					>
						{recipes.map((recipe) => (
							<RecipeCard
								key={recipe._id}
								title={recipe.title}
								ingredients={recipe.ingredients}
								instructions={recipe.instructions}
								onDelete={() => handleDelete(recipe._id)}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
