import 'dotenv/config';
import express from 'express';
import passport from 'passport';
import './configs/passport.js';

import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { connectWithDatabase } from './configs/db.js';

import { notFound } from './middlewares/notFound.middlewares.js';
import { errorHandler } from './middlewares/error.middlewares.js';

import { router as authRouter } from './routes/api/auth.routes.js';
import { router as userRouter } from './routes/api/user.routes.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// logger
app.use(morgan('dev'));

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.all('*', notFound);
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`server is running at http://localhost:${PORT}`);
  await connectWithDatabase();
});
