import express from 'express';
import 'dotenv/config';

import cors from 'cors';
// import cookieParser from "cookie-parser";
import { errors } from 'celebrate';

// import { connectMongoDB } from './db/connectMongoDB.js';

import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from './middleware/logger.js';

// import authRoutes from './routes/authRoutes.js';
// import notesRouter from './routes/notesRoutes.js';
// import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
// app.use(cookieParser());
app.use(logger);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world!' });
});

// app.use(authRoutes);
// app.use(notesRouter);
// app.use(userRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

// await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
