import { type Request, type Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
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

export async function loginUser(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  };

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    };

    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if (!passwordIsMatch) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    };

    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET_KEY,
      { expiresIn: '1d' },
    );

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.status(200).json({ userId: user._id });
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: 'Something went wrong!' });
  };
};