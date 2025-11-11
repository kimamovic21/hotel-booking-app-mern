import mongoose from 'mongoose';
import chalk from 'chalk';

export async function connectDB(): Promise<void> {
  try {
    const connectionString = process.env.MONGODB_CONNECTION_STRING;

    if (!connectionString) {
      throw new Error('MONGODB_CONNECTION_STRING is not defined in .env file');
    };

    await mongoose.connect(connectionString);

    console.log(chalk.green.bold('MongoDB connected successfully.'));
  } catch (error) {
    console.error(chalk.red.bold('Failed to connect to MongoDB:'), error);
    process.exit(1);
  };
};
