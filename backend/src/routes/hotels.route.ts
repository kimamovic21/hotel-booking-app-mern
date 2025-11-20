import { Router } from 'express';
import { searchHotel } from '../controllers/hotels.controller';

const router = Router();

router.get('/search', searchHotel);

export default router;