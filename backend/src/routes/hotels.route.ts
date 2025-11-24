import { Router } from 'express';
import {
  searchHotel,
  getHotelDetailsById
} from '../controllers/hotels.controller';
import { hotelParamsValidator } from '../validators/hotelsValidators';

const router = Router();

router.get('/search', searchHotel);
router.get('/:id', hotelParamsValidator, getHotelDetailsById);

export default router;