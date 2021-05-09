import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

router.get('/api/auth/me', (req: Request, res: Response) => {
  res.status(200).send({
    user: {
      name: 'rickychao',
      email: 'lusifar0910@gmail.com',
    },
  });
});

export { router as authRouter };
