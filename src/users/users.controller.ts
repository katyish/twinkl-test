/* eslint-disable no-console */
import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { userService } from './users.service';
import logger from '../logger';

export const getUser = (req: Request, res: Response) => {
  const userId = req.params.id;
  logger.info(`attempting to fetch user with id ${userId}`);
  const user = userService.getUserById(userId);
  if (user) {
    logger.info('returning user details');
    res.json(user);
  } else {
    logger.error({ userId }, 'User not found');
    res.status(404).json({ error: 'User not found' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await userService.createUser(req.body);
    // log user creation, but without any PII
    logger.info({ userId: newUser.id }, 'sucessfully created new user');
    res.status(201).json(newUser);
  } catch (error: any) {
    if (error instanceof ZodError) {
      logger.warn(
        { errors: error.issues },
        'User creation failed, validation error',
      );
      res
        .status(400)
        .json({ message: 'Validation Failed', errors: error.issues });
    } else {
      logger.error('Server Error');
      res.status(500).send('Server Error');
    }
  }
};
