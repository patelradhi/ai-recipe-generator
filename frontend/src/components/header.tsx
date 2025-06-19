import { SignedIn, SignedOut, UserButton, SignIn } from '@clerk/clerk-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { BriefcaseBusiness } from 'lucide-react';

function Header() {
	const [showSignIn, setShowSignIn] = React.useState(false);

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) setShowSignIn(false);
	};

	return (
		<>
			<nav className="sticky top-0 z-50 bg-gradient-to-r from-[#232946]/95 to-[#393e46]/90 border-b border-[#eabf70] shadow-md flex items-center justify-between px-6 py-1">
				<Link to="/" className="text-lg font-bold tracking-tight text-[#eabf70]">
					AI Powered Recipe Generator
				</Link>

				<div>
					<SignedOut>
						<Button variant="blue" onClick={() => setShowSignIn(true)}>
							Login
						</Button>
					</SignedOut>
					<SignedIn>
						<UserButton
							appearance={{
								elements: {
									avatarBox: 'w-10 h-10 ring-0',
									avatarImage: 'w-10 h-10',
								},
							}}
						>
							<UserButton.MenuItems>
								<UserButton.Link
									label="Saved Recipes"
									labelIcon={<BriefcaseBusiness size={15} />}
									href="/saved-recipes"
								/>
								<UserButton.Action label="Manage Account" />
							</UserButton.MenuItems>
						</UserButton>
					</SignedIn>
				</div>
			</nav>

			{showSignIn && (
				<div
					className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
					onClick={handleOverlayClick}
				>
					<SignIn signUpForceRedirectUrl="/" fallbackRedirectUrl="/" />
				</div>
			)}
		</>
	);
}

export default Header;
