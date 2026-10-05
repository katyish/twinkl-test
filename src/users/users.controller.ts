/* eslint-disable no-console */
import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { userService } from './users.service';
import logger from '../logger';

export const getUser = (req: Request, res: Response) => {
  logger.info(`attempting to fetch user with id ${req.params.id}`);
  const user = userService.getUserById(req.params.id);
  if (user) {
    logger.info('returning user details');
    res.json(user);
  } else {
    logger.error('User not found');
    res.status(404).json({ error: 'User not found' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    logger.info('creating new user');
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error: any) {
    if (error instanceof ZodError) {
      logger.error({ msg: 'User creation failed, validation error' });
      res
        .status(400)
        .json({ message: 'Validation Failed', errors: error.issues });
    } else {
      logger.error('Server Error');
      res.status(500).send('Server Error');
    }
  }
};
