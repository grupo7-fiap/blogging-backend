import express from 'express';
import postsRouter from './http/controllers/post/route';

export const app = express();

// Configuração de middlewares
app.use(express.json());

// Configuração de rotas
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/posts', postsRouter);
