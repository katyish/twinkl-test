import express, { Express, Request, Response } from 'express';
import logger from './logger';
import * as userController from './users/users.controller';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/user/:id', userController.getUser);

app.post('/user', userController.createUser);

export const server = app.listen(port, () => {
  logger.info(
    { port },
    `[server]: Server is running at http://localhost:${port}`,
  );
});

export default app;
