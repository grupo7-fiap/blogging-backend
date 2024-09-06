import express from 'express';
import postsRouter from './http/controllers/post/route';
import cors from 'cors';
export const app = express();
// Configuração de middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3001' }));
console.log('CORS middleware applied');


// Configuração de rotas
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/posts', postsRouter);
