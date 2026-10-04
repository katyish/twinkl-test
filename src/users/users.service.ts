import { UUID } from 'crypto';

/* eslint-disable no-console */
export type UserType = 'student' | 'teacher' | 'parent' | 'private tutor';

export type User = {
  id: UUID;
  name: string;
  email: string;
  password: string;
  userType: UserType;
  createdAt: string;
};

class UserService {
  private userList: Array<User> = [
    {
      id: 'a8429ab6-b732-4cb9-bfb0-65e4db324394',
      name: 'John Doe',
      email: 'jd@jd.com',
      password: '123456',
      userType: 'student',
      createdAt: '2026-10-03',
    },
  ];

  getUserById = (userId: string): User | null => {
    console.log(`fetching user id ${userId}`);
    const user = this.userList.find((u) => u.id === userId);
    if (user) {
      return user;
    }
    return null;
  };

  // eslint-disable-next-line class-methods-use-this
  createUser = () => false;
}

export const userService = new UserService();
