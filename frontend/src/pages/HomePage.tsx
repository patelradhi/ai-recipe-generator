import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import RecipeCard from '@/components/RecipeCard';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

type FormValues = { ingredients: string };

type Recipe = {
	title: string;
	ingredients: string[];
	instructions: string[];
};

export default function Home() {
	const { register, handleSubmit, setValue, reset } = useForm<FormValues>();
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const { getToken } = useAuth();
	const location = useLocation();

	const locationIngredients = location.state?.ingredients || [];
	const locationCuisine = location.state?.cuisine || '';

	useEffect(() => {
		if (locationIngredients.length > 0) {
			setValue('ingredients', locationIngredients.join(', '));
		}
	}, [locationIngredients, setValue]);

	const onSubmit = async (data: FormValues) => {
		setLoading(true);
		setError(null);
		try {
			const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/recipe/generate`, {
				ingredients: data.ingredients,
				cuisine: locationCuisine,
			});
			const received = res.data.recipe;

			if ('error' in received) {
				setError(received.error);
				setRecipe(null);
			} else {
				setRecipe(received);
				reset();
			}
		} catch (error) {
			setError('Failed to generate recipe. Try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleSaveRecipe = async () => {
		const token = await getToken();
		try {
			const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/recipe/save`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(recipe),
			});
			const data = await res.json();
			if (res.ok) {
				toast.success('Recipe saved!');
			} else {
				toast.error(data.error || 'Failed to save recipe');
			}
		} catch (err) {
			console.error(err);
			toast.error('Error saving recipe');
		}
	};

	return (
		<div className="w-full min-h-[calc(100vh-64px)] flex-1 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] flex flex-col items-center px-1 py-1 overflow-hidden">
			<h1 className="text-2xl font-extrabold text-white mt-10 tracking-tight">
				What’s in your fridge? Let’s cook!
			</h1>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-white/10 backdrop-blur-md mt-7 w-full max-w-xl rounded-2xl border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.2)] p-3 flex items-center gap-3 transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-white/30 focus-within:ring-2 focus-within:ring-white/30"
			>
				<textarea
					{...register('ingredients', { required: true })}
					placeholder="Type ingredients like: tomato, onion, garlic..."
					className="flex-grow resize-none overflow-hidden bg-transparent text-white placeholder-white/50 focus:outline-none text-lg"
					rows={1}
					onInput={(e) => {
						const target = e.target as HTMLTextAreaElement;
						target.style.height = 'auto';
						target.style.height = `${target.scrollHeight}px`;
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault();
							handleSubmit(onSubmit)();
						}
					}}
				/>
				<Button
					type="submit"
					disabled={loading}
					variant="ghost"
					className="p-2 rounded-xl bg-white/10 hover:bg-white transition-all duration-300 group"
				>
					{loading ? (
						<div className="flex items-center justify-center space-x-0.5">
							<div className="w-1 h-4 bg-white animate-pulse" />
							<div className="w-1 h-6 bg-white animate-pulse delay-150" />
							<div className="w-1 h-4 bg-white animate-pulse delay-300" />
						</div>
					) : (
						<Send className="h-5 w-5 text-white group-hover:text-black transition-colors duration-300" />
					)}
				</Button>
			</form>

			{error && (
				<div className="bg-red-50 border border-red-300 text-red-800 px-6 py-4 rounded-lg shadow-sm max-w-xl mx-auto mt-20">
					<div className="flex items-start gap-3">
						<svg
							className="w-5 h-5 mt-1 text-red-500 flex-shrink-0"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 9v2m0 4h.01M5.07 19H18.93a2 2 0 001.94-2.5l-3.64-9.13A2 2 0 0015.39 6H8.61a2 2 0 00-1.84 1.37L3.13 16.5A2 2 0 005.07 19z"
							/>
						</svg>
						<div>
							<p className="font-semibold text-sm">Oops! Couldn't generate a recipe.</p>
							<p className="text-sm mt-1">{error}</p>
						</div>
					</div>
				</div>
			)}

			{recipe && !error && (
				<div className="mt-10 w-full flex justify-center">
					<RecipeCard
						title={recipe.title}
						ingredients={recipe.ingredients}
						instructions={recipe.instructions}
						onSave={handleSaveRecipe}
					/>
				</div>
			)}
		</div>
	);
}
