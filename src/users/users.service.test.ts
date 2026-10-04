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
      password: 'ABc5Dfg83',
      userType: 'student',
    };
    const response = userService.createUser(newUserInput);
    expect(response).toMatchObject(newUserInput);
    expect(response?.id).toBe('mock-random-uuid');
    // todo: check we have a createdAt date
  });

  // test validation rules specified in instructions
  it('throws an error if a field is missing', async () => {
    const newUserInput = {
      // missing email field
      name: 'fred',
      password: 'Abc123yx',
      userType: 'student',
    };
    expect(() => {
      userService.createUser(newUserInput);
    }).toThrow('received undefined');
  });

  it('throws an error if a field is empty', async () => {
    const newUserInput = {
      name: '',
      email: 'fred@hotmail.com',
      password: 'AbcdeF99',
      userType: 'student',
    };
    expect(() => {
      userService.createUser(newUserInput);
    }).toThrow();
  });
  it('throws an error if password is too short', async () => {
    const newUserInput = {
      name: 'fred',
      email: 'fred@hotmail.com',
      password: 'aB9',
      userType: 'student',
    };
    expect(() => {
      userService.createUser(newUserInput);
    }).toThrow('Too small');
  });

  it('throws an error if password is too long', async () => {
    const newUserInput = {
      name: 'fred',
      email: 'fred@hotmail.com',
      password:
        'aaaaaaAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa88888aaaaaaaaaaaaaaaaaaaaaaaaa',
      userType: 'student',
    };
    expect(() => {
      userService.createUser(newUserInput);
    }).toThrow('Too big');
  });

  it('throws an error if password does not contain a number', async () => {
    const newUserInput = {
      name: 'fred',
      email: 'fred@hotmail.com',
      password: 'ABCdefGH',
      userType: 'student',
    };
    expect(() => {
      userService.createUser(newUserInput);
    }).toThrow('Must contain at least one number');
  });

  it('throws an error if password does not contain a lowercase letter', async () => {
    const newUserInput = {
      name: 'fred',
      email: 'fred@hotmail.com',
      password: 'ABCDEFGH',
      userType: 'student',
    };
    expect(() => {
      userService.createUser(newUserInput);
    }).toThrow('Must contain at least one lowercase letter');
  });

  it('throws an error if password does not contain an uppercase letter', async () => {
    const newUserInput = {
      name: 'fred',
      email: 'fred@hotmail.com',
      password: 'abcdefgh',
      userType: 'student',
    };
    expect(() => {
      userService.createUser(newUserInput);
    }).toThrow('Must contain at least one uppercase letter');
  });

  // test other validation
  it('throws an error if email is invalid', async () => {
    const newUserInput = {
      name: 'fred',
      email: 'fredAThotmail.com',
      password: 'AbcdeF99',
      userType: 'student',
    };
    expect(() => {
      userService.createUser(newUserInput);
    }).toThrow('Invalid email address');
  });

  it('throws an error if userType is invalid', async () => {
    const newUserInput = {
      name: 'fred',
      email: 'fred@hotmail.com',
      password: 'AbcdeF99',
      userType: 'unemployed',
    };
    expect(() => {
      userService.createUser(newUserInput);
    }).toThrow('Invalid option');
  });
});
