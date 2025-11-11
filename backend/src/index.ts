import express, { type Request, type Response } from 'express';
import cors from 'cors';
import chalk from 'chalk';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/v1/test', async (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express endpoint!' });
});

app.listen(PORT, () => {
  console.log(chalk.green(`Server is running on localhost: ${PORT}`));
});