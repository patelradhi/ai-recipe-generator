// routes/auth.route.ts
import express from 'express';
import { requireAuth } from '@clerk/express';

import { syncUser } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/sync-user', requireAuth(), syncUser);

export default authRouter;
