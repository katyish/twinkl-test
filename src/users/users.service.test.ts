import { CreateUserInput, UserResponse, userService } from './users.service';

jest.mock('crypto', () => ({
  randomUUID: () => 'mock-random-uuid-for-testing',
}));

const invalidUserId = '8888-aaaa-4444-bbbb-2222';
const validUser: UserResponse = {
  // matches our hardcoded seed data, minus the pasword
  id: 'a8429ab6-b732-4cb9-bfb0-65e4db324394',
  name: 'John Doe',
  email: 'jd@jd.com',
  userType: 'student',
  createdAt: '2026-10-04T17:00:00Z',
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
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-10-04T17:00:00Z'));
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  const newUserInput: CreateUserInput = {
    name: 'fred',
    email: 'fred@hotmail.com',
    password: 'ABc5Dfg83',
    userType: 'student',
  };
  it('returns user object if creation successful', async () => {
    const newUserResponse: UserResponse = {
      id: 'mock-random-uuid-for-testing',
      name: 'fred',
      email: 'fred@hotmail.com',
      userType: 'student',
      createdAt: '2026-10-04T17:00:00Z',
    };
    const response = await userService.createUser(newUserInput);
    expect(response).toMatchObject(newUserResponse);
  });

  // test validation rules specified in instructions
  it('throws an error if a field is missing', async () => {
    const newUserInputMissingEmail = {
      // missing email field
      ...newUserInput,
      email: undefined,
    };
    expect(async () => {
      await userService.createUser(newUserInputMissingEmail);
    }).rejects.toThrow('received undefined');
  });

  it('throws an error if a field is empty', async () => {
    const newUserInputEmptyField = {
      ...newUserInput,
      name: '',
    };
    expect(async () => {
      await userService.createUser(newUserInputEmptyField);
    }).rejects.toThrow();
  });
  it('throws an error if password is too short', async () => {
    const newUserInputShortPassword = {
      ...newUserInput,
      password: 'aB9',
    };
    expect(async () => {
      await userService.createUser(newUserInputShortPassword);
    }).rejects.toThrow('Too small');
  });

  it('throws an error if password is too long', async () => {
    const newUserInputLongPassword = {
      ...newUserInput,
      password:
        'aaaaaaAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa88888aaaaaaaaaaaaaaaaaaaaaaaaa',
    };
    expect(async () => {
      await userService.createUser(newUserInputLongPassword);
    }).rejects.toThrow('Too big');
  });

  it('throws an error if password does not contain a number', async () => {
    const newUserInputPwNoNumber = {
      ...newUserInput,
      password: 'ABCdefGH',
    };
    expect(async () => {
      await userService.createUser(newUserInputPwNoNumber);
    }).rejects.toThrow('Must contain at least one number');
  });

  it('throws an error if password does not contain a lowercase letter', async () => {
    const newUserInputPwNoLower = {
      ...newUserInput,
      password: 'ABCDEFGH',
    };
    expect(async () => {
      await userService.createUser(newUserInputPwNoLower);
    }).rejects.toThrow('Must contain at least one lowercase letter');
  });

  it('throws an error if password does not contain an uppercase letter', async () => {
    const newUserInputPwNoUpper = {
      ...newUserInput,
      password: 'abcdefgh',
    };
    expect(async () => {
      await userService.createUser(newUserInputPwNoUpper);
    }).rejects.toThrow('Must contain at least one uppercase letter');
  });

  // test other validation
  it('throws an error if email is invalid', async () => {
    const newUserInputEmailInvalid = {
      ...newUserInput,
      email: 'fredAThotmail.com',
    };
    expect(async () => {
      await userService.createUser(newUserInputEmailInvalid);
    }).rejects.toThrow('Invalid email address');
  });

  it('throws an error if userType is invalid', async () => {
    const newUserInputUserTypeInvalid = {
      ...newUserInput,
      userType: 'unemployed',
    };
    expect(async () => {
      await userService.createUser(newUserInputUserTypeInvalid);
    }).rejects.toThrow('Invalid option');
  });
});
