import { Router } from 'express';
import {
  searchHotel,
  getHotelDetailsById,
  createPayment,
  createBooking,
  getRecentBookings
} from '../controllers/hotels.controller';
import { hotelParamsValidator } from '../validators/hotelsValidators';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/search', searchHotel);
router.get('/', getRecentBookings);
router.get('/:id', hotelParamsValidator, getHotelDetailsById);
router.post(
  '/:hotelId/bookings/payment-intent',
  verifyToken,
  createPayment
);
router.post(
  '/:hotelId/bookings',
  verifyToken,
  createBooking
);

export default router;