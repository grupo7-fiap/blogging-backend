// db.ts

import { createPool, Pool } from 'mysql2/promise';
import { env } from '../env';

const CONFIG = {
  user: env.DATABASE_USER,
  host: env.DATABASE_HOST,
  database: env.DATABASE_NAME,
  password: env.DATABASE_PASSWORD,
  port: Number(env.DATABASE_PORT),
};

class Database {
  private pool: Pool;

  constructor() {
    this.pool = createPool(CONFIG);
  }

  async getConnection() {
    try {
      return await this.pool.getConnection();
    } catch (error) {
      console.error(`Error connecting to the database: ${error}`);
      throw new Error(`Error connecting to the database: ${error}`);
    }
  }

  async closePool() {
    try {
      await this.pool.end();
    } catch (error) {
      console.error(`Error closing the database pool: ${error}`);
    }
  }

  get poolInstance() {
    return this.pool;
  }
}

export const database = new Database();
