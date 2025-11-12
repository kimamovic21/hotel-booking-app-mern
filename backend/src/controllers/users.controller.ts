import { type Request, type Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
const NODE_ENV = process.env.NODE_ENV as string;

export async function registerUser(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array });
  };

  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res
        .status(400)
        .json({ message: 'User already exists!' });
    };

    user = new User(req.body);

    await user.save();

    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET_KEY,
      { expiresIn: '1d' },
    );

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24
    });

    return res.sendStatus(200);
  } catch (err) {
    console.error(err);

    return res
      .status(500)
      .send({ message: 'Something went wrong!' });
  };
};