import { database } from '../../src/lib/mysql/db';
import * as mysql from 'mysql2/promise';

jest.mock('mysql2/promise', () => ({
  createPool: jest.fn().mockImplementation(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_connectionUri: string = 'dummy_connection_uri') => ({
      getConnection: jest.fn(() =>
        Promise.resolve({
          release: () => {},
        }),
      ),
    }),
  ),
}));

describe('Database connection', () => {
  it('should get a connection from the pool', async () => {
    const connection = await database.getConnection();

    expect(connection).toBeDefined();
    expect(mysql.createPool).toHaveBeenCalled();
  });
});
