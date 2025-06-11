import express, { Request, Response } from 'express';
import connectDB from './dbConnection/database';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.get('/', (req: Request, res: Response) => {
	res.send('Hello CommonJS + TypeScript!');
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
