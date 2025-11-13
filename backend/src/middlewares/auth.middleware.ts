import type { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
};

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies['auth_token'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized!' });
  };

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);

    req.userId = (decodedToken as JwtPayload).userId;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Unauthorized!' });
  };
};