import request from 'supertest';
import app from '.';

describe('/ endpoint', () => {
  it('GET / should return hello world', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});

describe('/user endpoints', () => {
  describe('POST /user', () => {
    it.todo('accepts valid data and creates a user');
    it.todo('returns an error for missing data');
    it.todo('returns an error for invalid data');
    it.todo('returns an error if user already exists');
  });

  describe('GET /user:id', () => {
    const invalidUserId = 10000;
    const validUser = {
      id: 1,
      name: 'John Doe',
      email: 'jd@jd.com',
      password: '123456',
      userType: 'student',
      createdAt: '2026-10-03',
    };

    it('returns a JSON object of user details for a known user id', async () => {
      const response = await request(app).get(`/user/${validUser.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ id: 1, name: 'John Doe' });
    });

    it('returns an error if the user id does not exist', async () => {
      const response = await request(app).get(`/user/${invalidUserId}`);
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('User not found');
    });
  });
});
