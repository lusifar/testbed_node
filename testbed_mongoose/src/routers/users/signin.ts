import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../../middlewares/validate-request';

import { Password } from '../../services/password';
import { User } from '../../models/user';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().isLength({ min: 4, max: 15 }).withMessage('You must supply a valid password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // check the credential
    const existingUser = await User.findOne({
      email,
    });
    if (!existingUser) {
      throw new Error('Invalid Credential');
    }

    const passwordMatch = await Password.compare(existingUser.password, password);
    if (!passwordMatch) {
      throw new Error('Invalid Credential');
    }

    // generate jwt token
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET!
    );

    // store it on session
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
