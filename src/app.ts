import express from 'express';
import postsRouter from './http/routes/route';
import authRouter from './http/routes/authroute';
import userRouter from './http/routes/userRoutes';
import cors from 'cors';
import studentRouter from './http/routes/studentRoutes';

export const app = express();

const allowedOrigins = ['http://localhost:3001', 'http://localhost:8081'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Não permitido pelo CORS'));
      }
    },
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  }),
);

console.log('CORS middleware configurado');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/posts', postsRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/students', studentRouter);
