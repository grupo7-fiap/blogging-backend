import { getAdminPosts } from '../../../src/http/controllers/post/admin/get';
import { Request, Response } from 'express';
import { database } from '../../../src/lib/mysql/db'; // Importe o módulo real para acessar o mock

jest.mock('../../../src/lib/mysql/db', () => {
  const originalModule = jest.requireActual('../../../src/lib/mysql/db');

  return {
    ...originalModule,
    database: {
      ...originalModule.database,
      getConnection: jest.fn().mockResolvedValue({
        query: jest.fn().mockResolvedValue([
          {
            id: 1,
            title: 'Primeiro Post',
            description: 'Descrição do primeiro post',
            content: 'Conteúdo do primeiro post.',
            author: 'Autor A',
            subject: 'Tecnologia',
            modifiedDate: new Date('2024-07-09T02:21:52.000Z'),
            createdDate: new Date('2024-07-09T02:21:52.000Z'),
          },
          {
            id: 2,
            title: 'Segundo Post',
            description: 'Descrição do segundo post',
            content: 'Conteúdo do segundo post.',
            author: 'Autor B',
            subject: 'Ciência',
            modifiedDate: new Date('2024-07-09T02:21:52.000Z'),
            createdDate: new Date('2024-07-09T02:21:52.000Z'),
          },
        ]),
        release: jest.fn(),
      }),
    },
  };
});

describe('getAdminPosts controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully retrieve posts', async () => {
    const req = {} as Request;
    const jsonMock = jest.fn();
    const res = {
      json: jsonMock,
      status: jest.fn(() => ({ json: jsonMock })),
    } as unknown as Response;

    await getAdminPosts(req, res);

    expect(res.status).not.toHaveBeenCalled(); // Ensure no error status was set
    expect(jsonMock).toHaveBeenCalledWith({
      success: true,
      data: [
        {
          id: 1,
          title: 'Primeiro Post',
          description: 'Descrição do primeiro post',
          content: 'Conteúdo do primeiro post.',
          author: 'Autor A',
          subject: 'Tecnologia',
          modifiedDate: new Date('2024-07-09T02:21:52.000Z'),
          createdDate: new Date('2024-07-09T02:21:52.000Z'),
        },
        {
          id: 2,
          title: 'Segundo Post',
          description: 'Descrição do segundo post',
          content: 'Conteúdo do segundo post.',
          author: 'Autor B',
          subject: 'Ciência',
          modifiedDate: new Date('2024-07-09T02:21:52.000Z'),
          createdDate: new Date('2024-07-09T02:21:52.000Z'),
        },
      ],
    });

    // Verificar se a função query foi chamada com os parâmetros corretos
    const mockGetConnection = database.poolInstance.getConnection as jest.Mock;
    const mockConnection = await mockGetConnection();
    const mockQuery = mockConnection.query as jest.Mock;

    expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM posts');
  });
});
