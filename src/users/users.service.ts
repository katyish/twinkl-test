import bcrypt from 'bcryptjs';
import { formatISO } from 'date-fns';
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

export type UserResponse = Omit<User, 'password'>;

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
      createdAt: '2026-10-04T17:00:00Z',
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

  createUser = async (input: unknown): Promise<UserResponse> => {
    const validInput: CreateUserInput = createUserSchema.parse(input);
    const hashedPassword = await bcrypt.hash(validInput.password, 10);
    const newUser: User = {
      ...validInput,
      id: randomUUID(),
      password: hashedPassword,
      createdAt: formatISO(new Date()),
    };
    this.userList.push(newUser);

    const { password, ...newUserResponse } = newUser;

    return newUserResponse;
  };
}

export const userService = new UserService();
