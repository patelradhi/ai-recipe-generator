// src/components/IngredientCard.tsx

interface IngredientCardProps {
	ingredients: string[];
	onClick?: () => void;
	styleType?: 'modern' | 'default';
}

const emojiMap: Record<string, string> = {
	Tomato: '🍅',
	Avocado: '🥑',
	Carrot: '🥕',
	Basil: '🌿',
	Onion: '🧅',
	Garlic: '🧄',
	Paneer: '🧀',
	Butter: '🧈',
	Rajma: '🫘',
	Noodles: '🍜',
	Cabbage: '🥬',
	Cornflour: '🌽',
	SpringOnion: '🧅',
	Besan: '🥣',
	Yogurt: '🥛',
	MustardSeeds: '🟤',
	Methi: '🌿',
	ChanaDal: '🫘',
	Jaggery: '🍯',
	Cardamom: '🟢',
	Ghee: '🧈',
	Lemon: '🍋',
	Farsan: '🥟',
	Chickpeas: '🧆',
	GaramMasala: '🧂',
	MustardLeaves: '🥬',
	MaizeFlour: '🌽',
	GreenChili: '🌶️',
	Chicken: '🍗',
	Ginger: '🫚',
	BlackLentils: '🫘',
	Cream: '🥛',
	SoySauce: '🥢',
	Capsicum: '🫑',
	ChiliSauce: '🌶️',
	Rice: '🍚',
	Egg: '🥚',
	Tofu: '🍥',
	BlackBeanSauce: '🫘',
	BellPepper: '🫑',
	Scallion: '🧅',
	Broccoli: '🥦',
	OysterSauce: '🦪',
	SesameOil: '🛢️',
	ToorDal: '🫘',
	Peanuts: '🥜',
	BottleGourd: '🥒',
	CurryLeaves: '🌿',
	Semolina: '🥣',
	Coconut: '🥥',
	Eggplant: '🍆',
	PeanutPowder: '🥜',
	Sesame: '⚪',
	Poha: '🍚',
	WheatFlour: '🌾',
	Sugar: '🍬',
	Sprouts: '🌱',
	Tilgul: '⚪',
	Muthia: '🥟',
	Handvo: '🥧',
	Mohanthal: '🍬',
	NaraliBhat: '🥥',
	BharliVangi: '🍆',
	KandaPoha: '🍚',
	TilgulPoli: '⚪',
};

export default function IngredientCard({ ingredients, onClick, styleType = 'modern' }: IngredientCardProps) {
	if (styleType === 'modern') {
		return (
			<div
				onClick={onClick}
				className="bg-gradient-to-br from-[#232946cc] to-[#393e46cc] rounded-3xl border border-[#eabf70] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all text-white flex flex-col justify-between gap-5 p-6 w-[280px] cursor-pointer"
			>
				{/* Ingredient List */}
				<ul className="space-y-2">
					{ingredients.map((item, i) => (
						<li key={i} className="text-base font-semibold flex items-center gap-2">
							<span className="text-[#eabf70] text-lg">•</span>
							<span className="truncate">{item}</span>
						</li>
					))}
				</ul>

				{/* Emojis */}
				<div className="flex justify-center gap-2 mt-2">
					{ingredients.map((item, i) => (
						<span
							key={i}
							className="text-2xl rounded-full bg-white/20 border border-white/20 px-3 py-2 shadow-sm"
							style={{
								backdropFilter: 'blur(2px)',
								WebkitBackdropFilter: 'blur(2px)',
							}}
						>
							{emojiMap[item] || '🍽️'}
						</span>
					))}
				</div>

				{/* CTA */}
				<div className="mt-4 text-center">
					<span className="inline-block px-4 py-1 rounded-full bg-[#eabf70]/90 text-gray-900 font-bold text-sm shadow hover:bg-[#f6e9d7] transition-colors">
						View More →
					</span>
				</div>
			</div>
		);
	}

	// fallback default style if needed
	return (
		<div onClick={onClick} className="border rounded-md p-4 min-w-[200px] cursor-pointer">
			{ingredients.join(', ')}
		</div>
	);
}
