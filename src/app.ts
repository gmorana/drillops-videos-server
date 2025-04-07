import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors'; // Import CORS middleware
import dotenv from 'dotenv';
import routesAPI from './routes/routesAPI'; // Import your API routes
dotenv.config(); // Load environment variables from .env file
const app = express();
const port = process.env.PORT || 3000;

// Middleware (example)
const loggerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Or you could potentially return a Promise here in more complex scenarios
};

app.use(loggerMiddleware);
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use('/api', routesAPI); // Use the API routes

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
