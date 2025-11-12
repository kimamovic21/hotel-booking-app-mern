import { check } from 'express-validator';

export const registerUserValidator = [
  check('firstName', 'First name is required')
    .isString()
    .notEmpty(),
  check('lastName', 'Last name is required')
    .isString()
    .notEmpty(),
  check('email', 'Please provide a valid email')
    .isEmail(),
  check('password', 'Password must be at least 6 characters long')
    .isLength({ min: 6 }),
];

export const loginUserValidator = [
  check('email', 'Please provide a valid email')
    .isEmail(),
  check('password', 'Password must be at least 6 characters long')
    .isLength({ min: 6 }),
];