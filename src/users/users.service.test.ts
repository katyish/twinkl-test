import { userService } from './users.service';

jest.mock('crypto', () => ({
  randomUUID: () => 'mock-random-uuid',
}));

const invalidUserId = '88';
const validUser = {
  // matches our hardcoded seed data
  id: 'a8429ab6-b732-4cb9-bfb0-65e4db324394',
  name: 'John Doe',
  email: 'jd@jd.com',
  password: '123456',
  userType: 'student',
  createdAt: '2026-10-03',
};

describe('getUserById', () => {
  it('returns a user for a valid id', async () => {
    const response = userService.getUserById(validUser.id);
    expect(response).toMatchObject(validUser);
  });

  it('returns null if user does not exist', async () => {
    const response = userService.getUserById(invalidUserId);
    expect(response).toBeNull();
  });
});

describe('createUser', () => {
  it('returns user object if creation successful', async () => {
    const newUserInput = {
      name: 'fred',
      email: 'fred@hotmail.com',
      password: 'Abc123yx',
      userType: 'student',
    };
    const response = userService.createUser(newUserInput);
    expect(response).toMatchObject(newUserInput);
    expect(response?.id).toBe('mock-random-uuid');
    // todo: check we have a createdAt date
  });

  it('throws an error if data validation fails', async () => {
    const newUserInput = { name: 'fred' };
    expect(() => {
      userService.createUser(newUserInput);
    }).toThrow();
  });
});
