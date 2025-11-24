import { param } from 'express-validator';

export const hotelParamsValidator = [
  param('id').notEmpty().withMessage('Hotel Id is required!')
];