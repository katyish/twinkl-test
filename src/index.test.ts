import request from 'supertest';
import app from '.';

describe('/ endpoint', () => {
  it('GET / should return hello world', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});
