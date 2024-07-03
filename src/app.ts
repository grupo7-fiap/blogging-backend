import express from 'express';
export const app = express();

// Sua configuração de rotas e middlewares
app.get('/', (req, res) => {
  res.send('Hello World!');
});
