import express, { Request, Response } from 'express';
import connectDB from './dbConnection/database.js';
import recipeRoute from './routes/recipeRoute.js';
import { clerkMiddleware } from '@clerk/express'; //
import authRouter from './routes/authRoute.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

//parse JSON
app.use(express.json());

// ✅ Enable CORS before routes
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
);

//database connection
connectDB();

// Clerk Middleware
app.use(clerkMiddleware()); // ✅ Set Clerk auth context first

//routes
app.use('/api/recipe', recipeRoute);
app.use('/api/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
	res.send('Hello CommonJS + TypeScript!');
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
