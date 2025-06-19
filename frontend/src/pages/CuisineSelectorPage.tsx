// CuisineSelectorPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IngredientCard from '@/components/IngredientCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const cuisineOptions = ['Punjabi', 'Chinese', 'Gujarati', 'Marathi'];

const ingredientGroups: Record<string, string[][]> = {
	Punjabi: [
		['Paneer', 'Tomato', 'Butter', 'Onion'],
		['Rajma', 'Onion', 'Tomato', 'Garlic'],
		['Chickpeas', 'Onion', 'Tomato', 'Garam Masala'],
		['Mustard Leaves', 'Maize Flour', 'Ghee', 'Green Chili'],
		['Black Lentils', 'Cream', 'Butter', 'Tomato'],
	],
	Chinese: [
		['Noodles', 'Soy Sauce', 'Capsicum', 'Garlic'],
		['Cabbage', 'Cornflour', 'Soy Sauce', 'Spring Onion'],
		['Chicken', 'Ginger', 'Garlic', 'Chili Sauce'],
		['Rice', 'Egg', 'Spring Onion', 'Carrot'],
		['Tofu', 'Black Bean Sauce', 'Bell Pepper', 'Scallion'],
		['Broccoli', 'Oyster Sauce', 'Garlic', 'Sesame Oil'],
	],
	Gujarati: [
		['Besan', 'Yogurt', 'Eno', 'Mustard Seeds'],
		['Wheat Flour', 'Methi', 'Yogurt', 'Chili Powder'],
		['Rice', 'Toor Dal', 'Peanuts', 'Lemon'],
		['Gram Flour', 'Sugar', 'Ghee', 'Cardamom'],
		['Bottle Gourd', 'Besan', 'Yogurt', 'Curry Leaves'],
	],
	Marathi: [
		['Chana Dal', 'Jaggery', 'Cardamom', 'Ghee'],
		['Sprouts', 'Onion', 'Lemon', 'Farsan'],
		['Rice', 'Coconut', 'Jaggery', 'Cardamom'],
		['Poha', 'Onion', 'Peanuts', 'Curry Leaves'],
		['Wheat Flour', 'Jaggery', 'Sesame Seeds', 'Ghee'],
	],
};

export default function CuisineSelectorPage() {
	const [selectedCuisine, setSelectedCuisine] = useState('Punjabi');
	const navigate = useNavigate();

	const handleCardClick = (ingredients: string[]) => {
		navigate('/home', {
			state: {
				cuisine: selectedCuisine,
				ingredients,
			},
		});
	};

	return (
		<div className="min-h-screen w-full bg-gradient-to-br from-[#232946] via-[#393e46] to-[#6e7ff3] px-4 py-8">
			<h2 className="text-4xl font-extrabold text-center mb-6 text-white drop-shadow-md">Select Cuisine Type</h2>

			<div className="flex flex-wrap justify-center gap-6 mb-10 mt-10">
				{cuisineOptions.map((cuisine) => (
					<label
						key={cuisine}
						className={`flex items-center gap-2 px-7 py-3 rounded-full border font-semibold text-sm shadow-sm transition-all cursor-pointer backdrop-blur-md ${
							selectedCuisine === cuisine
								? 'bg-blue-600 text-white border-blue-700'
								: 'bg-white/80 text-gray-900 border-gray-300 hover:bg-blue-100'
						}`}
					>
						<input
							type="radio"
							name="cuisine"
							value={cuisine}
							checked={selectedCuisine === cuisine}
							onChange={() => setSelectedCuisine(cuisine)}
							className="hidden"
						/>
						{cuisine}
					</label>
				))}
			</div>

			<h2 className="text-2xl font-bold text-center text-white drop-shadow-sm mt-12">
				select a card to discover something delicious!
			</h2>

			<Carousel
				plugins={[Autoplay({ delay: 2000 })]}
				opts={{ loop: true }}
				className="w-full max-w-7xl mx-auto mt-10 pt-4 relative "
			>
				<CarouselContent>
					{ingredientGroups[selectedCuisine].map((ingredients, index) => (
						<CarouselItem key={index} className="basis-85">
							<IngredientCard
								ingredients={ingredients}
								onClick={() => handleCardClick(ingredients)}
								styleType="modern"
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
}
