import { useUser, SignIn } from '@clerk/clerk-react';
import React from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { isLoaded, isSignedIn } = useUser();

	// Wait for Clerk to load
	if (!isLoaded) return null;

	// If not signed in, show login box
	if (!isSignedIn) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
				<SignIn routing="virtual" />
			</div>
		);
	}

	// If signed in, render the protected content
	return <>{children}</>;
};

export default ProtectedRoute;
