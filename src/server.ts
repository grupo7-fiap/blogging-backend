import { env } from './lib/env';
import { app } from './app';

app.listen(Number(env.PORT), '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});
