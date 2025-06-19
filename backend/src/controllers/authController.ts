import { Request, Response } from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';
import User from '../models/userModel.js';

export const syncUser = async (req: Request, res: Response): Promise<void> => {
	try {
		// Access Clerk userId from the injected auth object
		const clerkUserId = (req as any).auth?.userId;

		if (!clerkUserId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		// Fetch user from Clerk
		const clerkUser = await clerkClient.users.getUser(clerkUserId);
		const email = clerkUser.emailAddresses[0]?.emailAddress;
		const name = clerkUser.firstName || 'Unknown';

		// Check if user exists in MongoDB
		let user = await User.findOne({ clerkId: clerkUserId });

		// Create user if not found
		if (!user) {
			user = await User.create({ name, email, clerkId: clerkUserId });
		}

		res.status(200).json({ message: 'User synced to MongoDB', user });
	} catch (err: any) {
		res.status(500).json({ message: 'Failed to sync user', error: err.message });
	}
};
