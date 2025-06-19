import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

const SyncUser = () => {
	const { getToken, isSignedIn } = useAuth();

	useEffect(() => {
		const syncUser = async () => {
			if (!isSignedIn) return;

			const token = await getToken();
			try {
				await axios.post(
					`${import.meta.env.VITE_API_BASE_URL}/auth/sync-user`,
					{},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				console.log('User synced');
			} catch (err) {
				console.error('Sync failed', err);
			}
		};

		syncUser();
	}, [isSignedIn]);

	return null;
};

export default SyncUser;
