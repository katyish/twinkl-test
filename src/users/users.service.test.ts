import { userService } from './users.service';

const invalidUserId = '88';
const validUser = {
  // matches our hardcoded seed data
  id: 1,
  name: 'John Doe',
  email: 'jd@jd.com',
  password: '123456',
  userType: 'student',
  createdAt: '2026-10-03',
};

describe('getUserById', () => {
  it('returns a user for a valid id', async () => {
    const response = userService.getUserById(validUser.id.toString());
    expect(response).toMatchObject(validUser);
  });

  it('returns null if user does not exist', async () => {
    const response = userService.getUserById(invalidUserId);
    expect(response).toBeNull();
  });
});
