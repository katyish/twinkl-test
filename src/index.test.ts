import request from 'supertest';
import app from '.';

describe('/ endpoint', () => {
  it('GET / should return hello world', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});

describe('POST /user endpoint', () => {
  it.todo('accepts valid data and creates a user');
  it.todo('returns an error for missing data');
  it.todo('returns an error for invalid data');
  it.todo('returns an error if user already exists');
});

describe('GET /user:id endpoint', () => {
  it.todo('returns a JSON object of user details for a known user id');
  it.todo('returns an error if the user id does not exist');
});
