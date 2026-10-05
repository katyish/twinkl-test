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
  const validUserInput = {
    name: 'fred smith',
    password: '123456Abc',
    email: 'fred@gmail.com',
    userType: 'teacher',
  };

  describe('POST /user', () => {
    it('accepts valid data and creates a user', async () => {
      const response = await request(app)
        .post('/user')
        .send(validUserInput)
        .set('Accept', 'application/json');
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(validUserInput);
    });

    it('returns an error for missing data', async () => {
      const response = await request(app)
        .post('/user')
        .send({ ...validUserInput, name: '' })
        .set('Accept', 'application/json');
      expect(response.status).toBe(400);
      expect(response.body.errors).toEqual([
        expect.objectContaining({
          path: ['name'],
          code: 'too_small',
        }),
      ]);
    });
    it('returns an error for invalid password', async () => {
      const response = await request(app)
        .post('/user')
        .send({ ...validUserInput, password: 'anc4' })
        .set('Accept', 'application/json');
      expect(response.status).toBe(400);
      expect(response.body.errors).toEqual([
        expect.objectContaining({
          path: ['password'],
          code: 'too_small',
          message: 'Too small: expected string to have >=8 characters',
        }),
        expect.objectContaining({
          path: ['password'],
          code: 'invalid_format',
        }),
      ]);
    });

    it('returns an error for invalid userType', async () => {
      const response = await request(app)
        .post('/user')
        .send({ ...validUserInput, userType: 'nurse' })
        .set('Accept', 'application/json');
      expect(response.status).toBe(400);
      expect(response.body.errors).toEqual([
        expect.objectContaining({
          path: ['userType'],
          code: 'invalid_value',
        }),
      ]);
    });
  });

  describe('GET /user:id', () => {
    const invalidUserId = 10000;
    const validUser = {
      id: 'a8429ab6-b732-4cb9-bfb0-65e4db324394',
      name: 'John Doe',
      email: 'jd@jd.com',
      password: '123456',
      userType: 'student',
      createdAt: '2026-10-04T17:00:00Z',
    };

    it('returns a JSON object of user details for a known user id', async () => {
      const response = await request(app).get(`/user/${validUser.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(validUser);
    });

    it('fetches a user that has just been created', async () => {
      const postResponse = await request(app)
        .post('/user')
        .send(validUserInput)
        .set('Accept', 'application/json');
      expect(postResponse.status).toBe(201);
      expect(postResponse.body).toMatchObject(validUserInput);

      const newUserId = postResponse.body.id;

      const response = await request(app).get(`/user/${newUserId}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(validUserInput);
    });

    it('returns an error if the user id does not exist', async () => {
      const response = await request(app).get(`/user/${invalidUserId}`);
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('User not found');
    });
  });
});
