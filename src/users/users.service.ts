import { randomUUID, UUID } from 'crypto';
import { z } from 'zod';

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

export const createUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  password: z
    .string()
    .min(8)
    .max(64)
    .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Must contain at least one number' }),
  userType: z.enum(['student', 'teacher', 'parent', 'private tutor']),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

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

  createUser = (input: unknown) => {
    const validInput: CreateUserInput = createUserSchema.parse(input);
    const newUser: User = {
      ...validInput,
      id: randomUUID(),
      createdAt: '2026-10-04',
    };
    this.userList.push(newUser);
    return newUser;
  };
}

export const userService = new UserService();
