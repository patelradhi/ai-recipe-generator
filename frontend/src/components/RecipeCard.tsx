import React, { useState } from 'react';
import { Copy, Trash2, Save } from 'lucide-react';
import { Button } from './ui/button';

interface RecipeCardProps {
	title: string;
	ingredients: string[];
	instructions: string[];
	onSave?: () => void;
	onDelete?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, ingredients, instructions, onSave, onDelete }) => {
	const [saved, setSaved] = useState(false);
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		const content = `Recipe: ${title}\n\nIngredients:\n${ingredients.join(
			'\n'
		)}\n\nInstructions:\n${instructions.join('\n')}`;
		navigator.clipboard.writeText(content);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleSave = () => {
		if (onSave) onSave();
		setSaved(true);
		setTimeout(() => setSaved(false), 2000);
	};

	const handleDelete = () => {
		if (onDelete) onDelete();
	};

	return (
		<div
			className="
        bg-[#1e293b]
        text-white
        rounded-2xl
        shadow-md
        hover:shadow-[0_4px_25px_rgba(255,215,0,0.15)]
        transition-shadow
        duration-300
        w-full
        max-w-sm
        h-[370px]
        flex flex-col
        overflow-hidden
        border border-yellow-500/20
      "
		>
			{/* Header */}
			<div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-white/10">
				<h2 className="text-lg font-semibold leading-tight pr-1 line-clamp-2">{title}</h2>
				<div className="flex gap-2">
					{onSave && (
						<Button onClick={handleSave} variant="ghost" className="p-1">
							{saved ? '✅' : <Save size={16} />}
						</Button>
					)}
					<Button onClick={handleCopy} variant="ghost" className="p-1">
						{copied ? '📋' : <Copy size={16} />}
					</Button>
					{onDelete && (
						<Button onClick={handleDelete} variant="ghost" className="p-1">
							<Trash2 size={16} />
						</Button>
					)}
				</div>
			</div>

			{/* Scrollable Body */}
			<div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-hide">
				{/* Ingredients */}
				<div className="mb-4 text-slate-300">
					<h3 className="font-bold text-yellow-400 flex items-center gap-1 mb-2">🧂 Ingredients</h3>
					<ul className="list-disc ml-5 space-y-1 text-sm leading-relaxed">
						{ingredients.map((item, idx) => (
							<li key={idx}>{item}</li>
						))}
					</ul>
				</div>

				{/* Instructions */}
				<div className="text-slate-300">
					<h3 className="font-semibold text-yellow-300 mb-1">👨‍🍳 Instructions</h3>
					<ol className="list-decimal list-inside text-sm space-y-1">
						{instructions.map((step, idx) => (
							<li key={idx}>{step.replace(/^\d+\.\s*/, '')}</li>
						))}
					</ol>
				</div>
			</div>
		</div>
	);
};

export default RecipeCard;
