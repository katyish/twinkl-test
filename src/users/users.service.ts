/* eslint-disable no-console */
export type UserType = 'student' | 'teacher' | 'parent' | 'private tutor';

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  userType: UserType;
  createdAt: string;
};

class UserService {
  private userList: Array<User> = [
    {
      id: 1,
      name: 'John Doe',
      email: 'jd@jd.com',
      password: '123456',
      userType: 'student',
      createdAt: '2026-10-03',
    },
  ];

  getUserById = (userId: string): User | null => {
    const id = parseInt(userId, 10);
    console.log(`fetching user id ${id}`);
    const user = this.userList.find((u) => u.id === id);
    if (user) {
      return user;
    }
    return null;
  };

  // eslint-disable-next-line class-methods-use-this
  createUser = () => false;
}

export const userService = new UserService();
