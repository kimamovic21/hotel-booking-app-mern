import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import { connectDB } from './database/connect';
import cors from 'cors';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route';

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

app.use('/api/v1/auth', authRoutes);

app.get('/api/v1/test', async (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express endpoint!' });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(chalk.green(`Server is running on http://localhost:${PORT}`));
  });
});