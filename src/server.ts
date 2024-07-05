import { env } from './lib/env';
import { app } from './app';
import { database } from './lib/mysql/db';

app.listen(Number(env.PORT), '0.0.0.0', async () => {
  try {
    const connection = await database.getConnection();
    connection.release();
    console.log('Connected to the database');
    console.log(`Server is running on http://localhost:${env.PORT}`);
  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
});