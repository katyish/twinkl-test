import { Request, Response } from 'express';
import * as userService from './users.service';

export const getUser = (req: Request, res: Response) => {
  const user = userService.getUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

export const createUser = (req: Request, res: Response) => {
  res.send('not implemented');
};
