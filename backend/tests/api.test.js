const request = require('supertest');
const app = require('../index');

describe('API Tests', () => {
  let createdId;

  test('Login with valid credentials', async () => {
    const res = await request(app).post('/login').send({
      username: 'test',
      password: '1234'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test('Login with invalid credentials', async () => {
    const res = await request(app).post('/login').send({
      username: 'wrong',
      password: 'wrong'
    });
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test('Get all todos (initial)', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Create a new todo item', async () => {
    const res = await request(app).post('/items').send({
      title: 'Test todo from API'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test todo from API');
    createdId = res.body.id;
  });

  test('Update the created todo item', async () => {
    const res = await request(app).put(`/items/${createdId}`).send({
      title: 'Updated via API',
      completed: true
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated via API');
    expect(res.body.completed).toBe(true);
  });

  test('Delete the todo item', async () => {
    const res = await request(app).delete(`/items/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test('Try to update non-existent item', async () => {
    const res = await request(app).put(`/items/99999`).send({
      title: 'Does not exist'
    });
    expect(res.statusCode).toBe(404);
  });

  test('Try to delete non-existent item', async () => {
    const res = await request(app).delete(`/items/99999`);
    expect(res.statusCode).toBe(404);
  });
});
