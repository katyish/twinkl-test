import express, { Express, Request, Response } from 'express';
import * as userController from './users/users.controller';

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/user/:id', userController.getUser);

app.post('/user', userController.createUser);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
