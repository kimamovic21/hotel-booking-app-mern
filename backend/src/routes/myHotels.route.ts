import { Router } from 'express';
import {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotelById
} from '../controllers/myHotels.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import {
  createHotelValidator,
  updateHotelValidator
} from '../validators/myHotelsValidators';
import multer from 'multer';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 5 * 1024 * 1024 // 5mb
  },
});

router.post(
  '/',
  verifyToken,
  createHotelValidator,
  upload.array('imageFiles', 6),
  createHotel
);

router.get(
  '/',
  verifyToken,
  getAllHotels
);

router.get(
  '/:id',
  verifyToken,
  getHotelById
);

router.put(
  '/:hotelId',
  verifyToken,
  updateHotelValidator,
  upload.array('imageFiles', 6),
  updateHotelById
);

export default router;