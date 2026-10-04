/* eslint-disable no-console */
import { Request, Response } from 'express';
import { userService } from './users.service';

export const getUser = (req: Request, res: Response) => {
  const user = userService.getUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

export const createUser = (req: Request, res: Response) => {
  try {
    console.log('creating new user');
    const newUser = userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error: any) {
    // TODO: surface zod validation errors
    console.log('caught error', error);
    res.status(400).send(error);
  }
};
